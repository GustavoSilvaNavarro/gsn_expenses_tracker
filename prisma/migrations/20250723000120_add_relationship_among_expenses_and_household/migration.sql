-- AlterTable
-- ! Add new column with NULL value
ALTER TABLE "expenses" ADD COLUMN     "household_id" TEXT;

-- ! Update the new column with the householdId, coming for the user table
UPDATE "expenses" AS e
SET "household_id" = h.id
FROM "users" AS u
JOIN "households" AS h ON u.household_id = h.id
WHERE e.user_id = u.id;

-- ! Make the household_id column NOT NULL
ALTER TABLE "expenses" ALTER COLUMN "household_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_household_id_fkey"
FOREIGN KEY ("household_id") REFERENCES "households"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
