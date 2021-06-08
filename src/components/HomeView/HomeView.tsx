import Cookies from "universal-cookie";

export function HomeView() {
    const cookies = new Cookies();

    return <div>Token: {cookies.get('token')}</div>
}