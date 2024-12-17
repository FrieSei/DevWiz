import { NextResponse } from 'next/server';
import { ApiError } from './errors';
import { auth } from '@clerk/nextjs';

export abstract class BaseController {
  protected async requireAuth() {
    const { userId } = auth();
    if (!userId) {
      throw new ApiError(401, 'Unauthorized');
    }
    return userId;
  }

  protected handleSuccess<T>(data: T) {
    return NextResponse.json(data);
  }

  protected handleError(error: unknown) {
    console.error('API Error:', error);
    
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}