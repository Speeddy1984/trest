import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('RolesGuard, user:', user);
    // Если вдруг пользователь отсутствует – выбрасываем UnauthorizedException (но обычно AuthenticatedGuard уже гарантирует, что user есть)
    if (!user) {
      throw new UnauthorizedException('Пользователь не аутентифицирован');
    }
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Forbidden resource');
    }
    return true;
  }
}
