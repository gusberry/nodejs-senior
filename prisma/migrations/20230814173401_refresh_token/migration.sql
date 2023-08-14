-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "refreshToken" TEXT,
ALTER COLUMN "verificationCode" DROP NOT NULL;
