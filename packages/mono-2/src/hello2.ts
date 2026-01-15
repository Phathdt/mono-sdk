import { hello1 } from '@mono-sdk/mono-1';

export function hello2(): number {
  return hello1() * 2;
}
