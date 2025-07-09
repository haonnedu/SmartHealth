export default function Header({ title }: { title: string }) {
    return (
        <div >
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    )
}