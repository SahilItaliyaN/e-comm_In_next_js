import Nav, { NavLink } from "@/components/Nav";


export const dynamic = "force-dynamic";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return <>
        <Nav>
            <NavLink href={"/admin"}>Dashboard</NavLink>
            <NavLink href={"/admin/product"}>Products</NavLink>
            <NavLink href={"/admin/user"}>User</NavLink>
            <NavLink href={"/admin/order"}>Order</NavLink>
        </Nav>
        <div className="container my-6">{children}</div>
    </>
}