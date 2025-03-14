import Link from "next/link";

const NavBar = () => {
return (
    <header className="bg-gray-100 p-4 flex justify-between items-center">
        <div className="text-xl text-black font-bold">Exo-db</div>
        <nav className="flex space-x-4">
            <Link href="/">
                <span className="text-blue-500 hover:underline">Home</span>
            </Link>
            <Link href="/new">
                <span className="text-blue-500 hover:underline">New Planet</span>
            </Link>
            <Link href="/view/123">
                <span className="text-blue-500 hover:underline">Details</span>
            </Link>
            <Link href="/login">
                <span className="text-blue-500 hover:underline">Login</span>
            </Link>
            <Link href="/signup">
                <span className="text-blue-500 hover:underline">Sign Up</span>
            </Link>
        </nav>
    </header>
);
}

export default NavBar;