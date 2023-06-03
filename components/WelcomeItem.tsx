"use client";

import { useUser } from "@/hooks/useUser";

const WelcomeItem = () => {
    const { user } = useUser();
    return (
        <h1
        className="
          text-white
          text-3xl
          font-semibold
        "
      >
        { user? "Welcome back" : "Welcome. Please log in." }
      </h1>
    );
}
 
export default WelcomeItem;