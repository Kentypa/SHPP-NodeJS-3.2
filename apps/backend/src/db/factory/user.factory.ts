import { setSeederFactory } from "typeorm-extension";
import { User } from "../../shared/entity/User";

export default setSeederFactory(User, () => {
  return new User();
});
