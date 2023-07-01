-- DropIndex
DROP INDEX "users_nim_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'GUEST',
ALTER COLUMN "nim" DROP NOT NULL;
