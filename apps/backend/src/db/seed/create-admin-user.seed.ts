import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { User } from "../../shared/entity/User";
import { Role } from "../../shared/enum/role.enum";

export default class AdminSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const adminExists = await userRepository.findOneBy({
      role: Role.ADMIN,
    });

    if (!adminExists) {
      await userRepository.insert({
        email: "admin@gmail.com",
        password: "admin",
        role: Role.ADMIN,
      });
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
  }
}
