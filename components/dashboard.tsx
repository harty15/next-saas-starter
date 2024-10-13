"use client"

import { useState } from "react"
import { Bell, Settings, Search, CreditCard, List, PieChart as PieChartIcon, Flag, BarChart2, Home, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function DashboardComponent({ children }: { children?: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  // Mock data for charts and transactions
  const incomeVsExpenses = [
    { name: "Income", value: 5000 },
    { name: "Expenses", value: 3500 },
  ]
  const COLORS = ["#0088FE", "#00C49F"]

  const transactions = [
    { id: 1, date: "2023-06-01", category: "Shopping", amount: -120.50 },
    { id: 2, date: "2023-06-02", category: "Groceries", amount: -85.20 },
    { id: 3, date: "2023-06-03", category: "Salary", amount: 3000.00 },
  ]

  const budgets = [
    { category: "Groceries", spent: 350, total: 500 },
    { category: "Entertainment", spent: 150, total: 200 },
    { category: "Transportation", spent: 180, total: 250 },
  ]

  const goals = [
    { name: "Vacation Fund", current: 2000, target: 5000, deadline: "2023-12-31" },
    { name: "Emergency Savings", current: 5000, target: 10000, deadline: "2024-06-30" },
  ]

  const spendingTrends = [
    { month: "Jan", amount: 3000 },
    { month: "Feb", amount: 3200 },
    { month: "Mar", amount: 2800 },
    { month: "Apr", amount: 3500 },
    { month: "May", amount: 3100 },
    { month: "Jun", amount: 3400 },
  ]

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/finnAI' },
    { icon: List, label: 'Transactions', href: '/transactions' },
    { icon: PieChartIcon, label: 'Budgets', href: '/budgets' },
    { icon: Flag, label: 'Goals', href: '/goals' },
    { icon: BarChart2, label: 'Insights & Reports', href: '/insights' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Collapsible Sidebar Navigation */}
      <aside className={`bg-white dark:bg-gray-800 p-4 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="mb-4 w-full flex justify-end"
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} passHref>
              <Button
                variant="ghost"
                className={`w-full justify-start ${sidebarCollapsed ? 'px-0' : ''} ${
                  pathname === item.href ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
              >
                <item.icon className="h-4 w-4" />
                {!sidebarCollapsed && <span className="ml-2">{item.label}</span>}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children ? children : (
          <>
            {/* Header Section */}
            <header className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Alex" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-semibold">Welcome, Alex</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Quick Actions</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Transfer Money</DropdownMenuItem>
                    <DropdownMenuItem>Create Goal</DropdownMenuItem>
                    <DropdownMenuItem>Pay Bill</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            {/* Financial Snapshot */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Total Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">$12,500.00</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Income vs Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={incomeVsExpenses}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {incomeVsExpenses.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Transactions Overview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Search transactions..." />
                  <Button variant="outline">Filter</Button>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {transactions.map((transaction) => (
                    <li key={transaction.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{transaction.category}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                      <span className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Budget Tracking */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Budget Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgets.map((budget) => (
                    <div key={budget.category}>
                      <div className="flex justify-between mb-1">
                        <span>{budget.category}</span>
                        <span>
                          ${budget.spent} / ${budget.total}
                        </span>
                      </div>
                      <Progress value={(budget.spent / budget.total) * 100} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Financial Goals */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Financial Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {goals.map((goal) => (
                    <Card key={goal.name}>
                      <CardHeader>
                        <CardTitle>{goal.name}</CardTitle>
                        <CardDescription>Target: ${goal.target} by {goal.deadline}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Progress value={(goal.current / goal.target) * 100} />
                        <p className="mt-2 text-sm text-gray-500">
                          ${goal.current} saved of ${goal.target}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Insights & Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Spending Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="weekly">
                  <TabsList>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                  </TabsList>
                  <TabsContent value="monthly">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={spendingTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  )
}
