'use client'

import { useState } from 'react'
import { Users } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { AddEmployeeDialog } from '@/components/employees/add-employee-dialog'
import { RegeneratePasswordDialog } from '@/components/employees/regenerate-password-dialog'
import {
  INITIAL_EMPLOYEES,
  ROLES,
  type Employee,
  type Role,
} from '@/lib/employees'

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES)

  function addEmployee(data: Omit<Employee, 'id' | 'active'>) {
    setEmployees((prev) => [
      { ...data, id: `emp-${Date.now()}`, active: true },
      ...prev,
    ])
  }

  function updateRole(id: string, role: Role) {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, role } : e)),
    )
  }

  function toggleActive(id: string, active: boolean) {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, active } : e)),
    )
  }

  const activeCount = employees.filter((e) => e.active).length

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Manajemen Karyawan</h2>
          <p className="text-sm text-muted-foreground">
            Kelola akun, role, dan status akses karyawan toko.
          </p>
        </div>
        <AddEmployeeDialog onAdd={addEmployee} />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <Users className="size-4" aria-hidden="true" />
            </span>
            <div>
              <CardTitle className="text-base">Daftar Karyawan</CardTitle>
              <CardDescription>
                {employees.length} total &middot; {activeCount} aktif
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Karyawan</TableHead>
                  <TableHead className="min-w-[150px]">Role</TableHead>
                  <TableHead className="min-w-[130px]">Status</TableHead>
                  <TableHead className="min-w-[80px] text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                            {initials(emp.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="leading-tight">
                          <p className="font-medium text-foreground">{emp.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {emp.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={emp.role}
                        onValueChange={(v) => updateRole(emp.id, v as Role)}
                      >
                        <SelectTrigger className="h-9 w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLES.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={emp.active}
                          onCheckedChange={(v) => toggleActive(emp.id, v)}
                          aria-label={`Status ${emp.name}`}
                        />
                        <Badge
                          variant={emp.active ? 'default' : 'secondary'}
                          className={
                            emp.active
                              ? 'bg-primary/10 text-primary hover:bg-primary/10'
                              : 'text-muted-foreground'
                          }
                        >
                          {emp.active ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <RegeneratePasswordDialog employee={emp} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
