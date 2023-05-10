using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web_2_Online_Shop.Migrations
{
    /// <inheritdoc />
    public partial class RenamingIsDeletedPropertyMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Deleted",
                table: "Users",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "Deleted",
                table: "Orders",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "Deleted",
                table: "OrderItems",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "Deleted",
                table: "Articles",
                newName: "IsDeleted");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Users",
                newName: "Deleted");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Orders",
                newName: "Deleted");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "OrderItems",
                newName: "Deleted");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Articles",
                newName: "Deleted");
        }
    }
}
