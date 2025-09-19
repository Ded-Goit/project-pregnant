'use client';

type LinkProps = {
  children: string;
};

export default function Link({ children }: LinkProps) {
  return <p>{children}</p>;
}
