'use client'

import { useState } from 'react'
import { KeyRound } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PasswordDisplay } from '@/components/employees/password-display'
import { generatePassword } from '@/lib/password'
import type { Employee } from '@/lib/employees'

type RegeneratePasswordDialogProps = {
  employee: Employee
}

export function RegeneratePasswordDialog({
  employee,
}: RegeneratePasswordDialogProps) {
  const [open, setOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [password, setPassword] = useState('')

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setConfirmed(false)
      setPassword('')
    }
  }

  function handleConfirm() {
    setPassword(generatePassword())
    setConfirmed(true)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8"
            aria-label={`Buat ulang password untuk ${employee.name}`}
          />
        }
      >
        <KeyRound className="size-4" aria-hidden="true" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {confirmed ? 'Password Baru Dibuat' : 'Buat Ulang Password?'}
          </DialogTitle>
          <DialogDescription>
            {confirmed
              ? `Password lama untuk ${employee.name} tidak berlaku lagi. Salin password baru di bawah ini.`
              : `Password lama milik ${employee.name} (${employee.email}) akan diganti dan tidak bisa dipakai lagi. Lanjutkan?`}
          </DialogDescription>
        </DialogHeader>

        {confirmed ? (
          <PasswordDisplay
            password={password}
            onRegenerate={() => setPassword(generatePassword())}
          />
        ) : null}

        <DialogFooter className="mt-2 gap-2 sm:gap-0">
          {confirmed ? (
            <Button type="button" onClick={() => handleOpenChange(false)}>
              Selesai
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Batal
              </Button>
              <Button type="button" onClick={handleConfirm}>
                Ya, Buat Ulang
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
