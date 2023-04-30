using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RentEase.DAL.Migrations
{
    public partial class FixNaming : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DeliveryAdress",
                table: "Orders",
                newName: "DeliveryAddress");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DeliveryAddress",
                table: "Orders",
                newName: "DeliveryAdress");
        }
    }
}
