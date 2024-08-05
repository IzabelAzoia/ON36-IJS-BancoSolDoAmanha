import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const request: Request = context.switchToHttp().getRequest();
        const user = request.user;

        // Verifica se o usuário está autenticado
        if (!user) {
            throw new UnauthorizedException('User not authenticated');
        }

        // Adicione verificações adicionais aqui, como verificar o papel do usuário ou permissões

        return true; // Retorna true para permitir o acesso
    }
}