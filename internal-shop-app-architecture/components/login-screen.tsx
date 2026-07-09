'use client'

import { useState } from 'react'
import { ShieldCheck, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type LoginScreenProps = {
  onLogin: (email: string) => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('admin@i1cctv.id')
  const [password, setPassword] = useState('password')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Mock auth — langsung masuk ke dashboard untuk keperluan preview
    onLogin(email || 'admin@i1cctv.id')
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <ShieldCheck className="size-7" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              i1 CCTV
            </h1>
            <p className="text-sm text-muted-foreground">Sistem Internal Toko</p>
          </div>
        </div>

        <Card className="border-border shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg">Masuk</CardTitle>
            <CardDescription>
              Gunakan akun internal Anda untuk melanjutkan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="nama@i1cctv.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 text-base"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 text-base"
                  required
                />
              </div>
              <Button type="submit" className="mt-2 h-11 w-full text-base">
                <LogIn className="size-4" aria-hidden="true" />
                Masuk
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {'\u00A9'} {new Date().getFullYear()} i1 CCTV · Akses terbatas untuk staf.
        </p>
      </div>
    </main>
  )
}
