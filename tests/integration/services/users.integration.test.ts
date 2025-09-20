import type { NewHouseholdUser } from '@interfaces';
import { addNewUserAndHousehold } from '@services';
import { testDbConn } from '@tests/helpers/testDbSetup';

describe('Category services tests', () => {
  describe('addNewUserAndHousehold', () => {
    test('Should successfully create a new user and household', async () => {
      const mockPayload: NewHouseholdUser = {
        email: 'gsn@gmail.com',
        name: 'Gustavo',
        lastname: 'Silva',
        householdName: 'Silther',
      };

      const newUser = await addNewUserAndHousehold(testDbConn, mockPayload);

      const expectedUser = await testDbConn.users.findUnique({
        where: { id: newUser.id },
        include: { household: true },
      });

      expect(newUser).toEqual(expectedUser);
    });
  });
});
