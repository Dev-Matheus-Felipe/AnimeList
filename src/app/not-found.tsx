import Link from "next/link";

export default function NotFound(){
    return(
        <div className="not_found">
            <h1>404 - Page not found!</h1>
            <p>Something went wrong, please go back to <a href="/">Home</a></p>
        </div>
    )
}