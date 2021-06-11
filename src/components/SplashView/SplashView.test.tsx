import {render, screen} from "@testing-library/react";
import {SplashView} from "./SplashView";

describe("Splash view", () => {

    it("should show 'Welcome!' caption and two buttons", async () => {
        //Given
        render(<SplashView/>);

        //When

        //Then
        const loginButton = await screen.findByText("Login");
        expect(loginButton).toBeInTheDocument();
        const loginAnonymouslyButton = await screen.findByText("Login anonymously");
        expect(loginAnonymouslyButton).toBeInTheDocument();
        expect(screen.getByText("Welcome!")).toBeInTheDocument();
    })
})