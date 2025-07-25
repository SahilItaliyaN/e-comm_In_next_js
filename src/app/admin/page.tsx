import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import db from '@/db/db'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import React from 'react'


async function getSalesData(){
    const data = await db.order.aggregate({
        _sum :  { pricePaidInCents : true},
        _count: true
    })

    return {
        amount :(data._sum.pricePaidInCents || 0) /100,
        numberofSales:data._count
    }
}

async function getUserData(){
    const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum:{ pricePaidInCents : true}
        }),
    ])

    return {
        userCount,
        averageValueParUser : userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0 ) / userCount / 100
    }
}

async function getProductData() {

    const [ activeCount , inactiveCount ] = await Promise.all([
        db.product.count({ where : { isAvailableForPurchase : true}}),
        db.product.count({ where : { isAvailableForPurchase : false}})
    ])
    return { activeCount , inactiveCount}
}

export default async function AdminDashboard() {

    const [ salesData , userData , productData ] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData()
    ])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <DashboardCard title='Sales' subtitle={`${formatCurrency(salesData.numberofSales)} Orders`} body={formatNumber(salesData.amount)} />

      <DashboardCard title='Customer' subtitle={`${formatNumber(userData.averageValueParUser)} Average Value`} body={formatCurrency(userData.userCount)} />

      <DashboardCard title='Active Prodcuts' subtitle={`${formatNumber(productData.inactiveCount)} Inactive`} body={formatCurrency(productData.activeCount)} />
    </div>
  )
}

type DashboardCardProps={
    title:string,
    subtitle:string,
    body:string
}

function DashboardCard({title,subtitle,body}:DashboardCardProps){
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{body}</p>
            </CardContent>
        </Card>
    )
}