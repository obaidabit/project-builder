import React from "react";
import Image from "../elements/Image"
export default function VioletLogInLayout() {
    return (
        <div id="VioletLogInLayout">
            <div class="main">
                <p class="sign" align="center">Sign in</p>
                <form class="form1">
                    <input class="pass" type="text" align="center" placeholder="Username" />
                    <input class="pass" type="password" align="center" placeholder="Password" />
                    <a class="submit" align="center">Sign in</a>
                    <p class="forgot" align="center"><a href="javascript::void()">Forgot Password?</a></p>
                </form>
            </div>
        </div>
    )
}