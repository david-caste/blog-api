import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
//import { error } from 'console';

interface User {
    id: string;
    name: string;
    email: string;
}

@Controller('users')
export class UsersController {

    private users: User[] = [
        { id: '1', name: 'Alicia', email: 'alicia@gmail.com' },
        { id: '2', name: 'Carolina', email: 'carolina@gmail.com' },
    ];

    @Get()
    getUsers() {
        return this.users;
    }

    @Get(':id')
    findUser(@Param('id') id: string) {
        const user = this.users.find((user) => user.id === id);
        if (!user) return { error: 'User not found' };
        return user;
    }

    @Post()
    createUser(@Body() body: Omit<User, 'id'>) {
        const newUser: User = {
            // Genera un ID automático basado en el último ID o timestamp
            id: (this.users.length + 1).toString(), 
            ...body
        };
        this.users.push(newUser);
        return newUser;
    }

    // CORRECCIÓN: El decorador debe ser ':id' y @Param debe coincidir
    @Delete(':id') 
    deleteUser(@Param('id') id: string) {
        const position = this.users.findIndex((user) => user.id === id);
        
        if (position === -1) {
            return { error: 'User not found' };
        }

        this.users.splice(position, 1);
        return { message: `User with id ${id} deleted` };
    }
}

