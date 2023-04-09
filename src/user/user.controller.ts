import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { imageFileFilter } from "src/utils/image.filter";

import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/updete-user.dto";
import { AuthGuard } from "../auth/jwt-auth.guard";
import { watchFile } from "node:fs";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @ApiOperation({ summary: "Get users[]" })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 1,
          email: "example@gmail.com",
          name: "Katya",
          city: "Lviv",
          status: true,
          age: 32,
          password: "qwerty12345"
        },
        {
          id: 2,
          email: "Ivan@gmail.com",
          name: "Ivan",
          city: "Kyiv",
          status: true,
          age: 25,
          password: "12345"
        }
      ]
    }
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: "Get one user" })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        email: "example@gmail.com",
        name: "Katya",
        city: "Lviv",
        status: true,
        age: 32,
        password: "qwerty12345"
      }
    }
  })
  @HttpCode(HttpStatus.OK)
  @Get("/:id")
  getOneUserById(@Param("id") id: string) {
    return this.userService.getOneById(id);
  }

  @ApiOperation({ summary: "Create one user" })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        email: "example@gmail.com",
        name: "Katya",
        city: "Lviv",
        status: true,
        age: 32,
        password: "qwerty12345"
      }
    }
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: "Update one user" })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        name: "Katya",
        city: "Lviv",
        age: 32
      }
    }
  })
  @Put("/:id")
  @UseInterceptors(
    FileInterceptor("avatar", {
      storage: diskStorage({
        destination: "./avatar",
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");

          return cb(null, `${randomName}${file.originalname}`);
        }
      }),
      fileFilter: imageFileFilter
    })
  )
  updateUser(
    @Body() userData: UpdateUserDto,
    @Param("id") id: string,
    @UploadedFile() avatar: Express.Multer.File
  ) {
    let newAvatarPath: string = null;
    try {
      if (avatar) {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join("");

        newAvatarPath = `avatar/${randomName}${avatar.originalname}`;
      }
      userData.avatar = newAvatarPath;

      return this.userService.updateUser(userData, id);
    }catch (e) {
      console.log(e);
    }
  }

  @Get('avatar/:image')
  watchFile(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './avatar' });
  }

  @ApiOperation({ summary: "delete one user" })
  @Delete("/:id")
  deleteUser(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}

//const randomName = Array(32)
//.fill(null)
//.map(() => Math.round(Math.random() * 16).toString())
//.join('');
