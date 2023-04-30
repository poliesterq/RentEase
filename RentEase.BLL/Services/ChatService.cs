using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using RentEase.BLL.Abstractions;
using RentEase.DAL.Abstractions;
using RentEase.Domain.Models.Chat;
using RentEase.Domain.Models.Entities;
using RentEase.Domain.Models.Request;

namespace RentEase.BLL.Services;

public class ChatService : IChatService
{
    private readonly ILogger<ChatService> _logger;
    private readonly IChatRepository _chatRepository;
    private readonly UserManager<User> _userManager;

    public ChatService(ILogger<ChatService> logger,
        IChatRepository chatRepository,
        UserManager<User> userManager)
    {
        _logger = logger;
        _chatRepository = chatRepository;
        _userManager = userManager;
    }

    public async Task<IEnumerable<Chat>> Get(string userId)
    {
        var chats = await _chatRepository.Get(chat => chat.Users.Any(user => user.Id == userId));

        _logger.LogInformation("Chats were got");
        return chats;
    }

    public async Task<Chat?> Get(string id, string userId)
    {
        var chat = await _chatRepository.Get(id);
        var result = await this.MarkAsRead(chat, userId);

        var logInformation = chat != null
            ? $"The chat with id = {id} was got"
            : $"The chat with id = {id} wasn't got";

        _logger.LogInformation(logInformation);
        return result ?? chat;
    }

    public async Task<Chat?> Create(Chat chat)
    {
        if (chat.Users.Count == 2)
        {
            var comparisonChat = await _chatRepository.FirstOrDefault(comparisonChat =>
                comparisonChat.Users.Count == 2
                && comparisonChat.Users.Any(user => user.Id == chat.Users[0].Id)
                && comparisonChat.Users.Any(user => user.Id == chat.Users[1].Id));

            if (comparisonChat != null)
            {
                _logger.LogInformation("The chat between this users is already exist");
                return null;
            }
        }

        var result = await _chatRepository.Create(chat);
        var logInformation = result != null
            ? $"The chat with id = {result.Id} was created"
            : "The chat wasn't created";

        _logger.LogInformation(logInformation);
        return result;
    }

    public async Task<bool> Delete(string id)
    {
        var result = await _chatRepository.Delete(id);
        var logInformation = result
            ? $"The chat with id = {id} was deleted."
            : $"The chat with id = {id} wasn't deleted.";

        _logger.LogInformation(logInformation);
        return result;
    }

    public async Task<bool> LeaveChat(string chatId, string userId)
    {
        var chat = await _chatRepository.Get(chatId);

        if (chat == null)
        {
            _logger.LogInformation("leaving chat failed");
            return false;
        }

        var leaveResult = chat.Users.RemoveAll(comparisonUser => comparisonUser.Id == userId);

        if (leaveResult > 0)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user != null)
            {
                var message = new Message
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Text = $"{user.FirstName} {user.LastName} has left the chat.",
                    Author = new ChatUser
                    {
                        Id = "",
                        FirstName = "Chat",
                        LastName = "Information"
                    },
                    SendTime = DateTime.Now,
                    IsRead = false
                };

                chat.Messages.Add(message);
            }

            var result = await _chatRepository.Update(chat);
            var logInformation = result != null
                ? "Chat successfully left"
                : "Leaving chat failed";
            _logger.LogInformation(logInformation);
            return result != null;
        }

        _logger.LogInformation("Leaving chat failed");
        return false;
    }

    public async Task<Chat?> SendMessage(SendMessageModel message)
    {
        var chat = await _chatRepository.Get(message.ChatId);

        if (chat != null)
        {
            message.Message.Id = ObjectId.GenerateNewId().ToString();
            chat.Messages.Add(message.Message);
            var result = await _chatRepository.Update(chat);
            var logInformation = result != null
                ? "Message was send"
                : "Message sending failed";
            _logger.LogInformation(logInformation);
            return result;
        }

        _logger.LogInformation("Message sending failed");
        return null;
    }

    public async Task<Chat?> DeleteMessage(DeleteMessageModel message)
    {
        var chat = await _chatRepository.Get(message.ChatId);

        if (chat != null)
        {
            var deleteResult = chat.Messages.RemoveAll(comparisonMessage => comparisonMessage.Id == message.MessageId);

            if (deleteResult > 0)
            {
                var result = await _chatRepository.Update(chat);
                var logInformation = result != null
                    ? "Message was deleted"
                    : "Message deleting failed";
                _logger.LogInformation(logInformation);
                return result;
            }
        }

        _logger.LogInformation("Message deleting failed");
        return null;
    }

    public async Task<long> CountUnread(string userId)
    {
        return await _chatRepository.Count(chat =>
            chat.Users.Any(user => user.Id == userId)
            && chat.Messages.Any(message => message.Author.Id != userId && !message.IsRead));
    }

    public async Task<bool> UpdateUser(ChatUser user)
    {
        var chats = await _chatRepository.Get(
            chat => chat.Users.Any(member => member.Id == user.Id)
                    || chat.Messages.Any(message => message.Author.Id == user.Id));

        foreach (var chat in chats)
        {
            var userDb = chat.Users.FirstOrDefault(member => member.Id == user.Id);

            if (userDb != null)
            {
                userDb.FirstName = user.FirstName;
                userDb.LastName = user.LastName;
            }

            foreach (var message in chat.Messages.Where(message => message.Author.Id == user.Id))
            {
                message.Author = user;
            }

            var result = await _chatRepository.Update(chat);

            if (result == null)
            {
                return false;
            }
        }

        return true;
    }

    private async Task<Chat?> MarkAsRead(Chat chat, string userId)
    {
        if (chat == null || chat.Messages.Count == 0)
        {
            return null;
        }

        for (int i = chat.Messages.Count - 1; i >= 0; i--)
        {
            if (chat.Messages[i].Author.Id == userId)
            {
                continue;
            }

            if (!chat.Messages[i].IsRead)
            {
                chat.Messages[i].IsRead = true;
            }
            else
            {
                break;
            }
        }

        var result = await _chatRepository.Update(chat);
        return result;
    }
}