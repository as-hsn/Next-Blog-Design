describe("Navbar Links and Registration Test", () => {
  beforeEach(() => {
    // Intercept API request for authors on homepage
    cy.intercept("GET", "**/api/authors", {
      statusCode: 200,
      body: {
        success: true,
        authors: [
          {
            id: 1,
            image:
              "https://res.cloudinary.com/deeltv1ff/image/upload/v1741280681/nextjs_uploads/l9hfx2at2cojyu3crhy3.png",
            name: "Author name 1",
          },
          {
            id: 2,
            image:
              "https://res.cloudinary.com/deeltv1ff/image/upload/v1741282384/nextjs_uploads/fwiggwlvzsjdxuulf62w.png",
            name: "Author name 2",
          },
          {
            id: 3,
            image:
              "https://res.cloudinary.com/deeltv1ff/image/upload/v1741282327/nextjs_uploads/e37us8hcpxdynfb7pqdl.png",
            name: "Author name 3",
          },
          {
            id: 4,
            image:
              "https://res.cloudinary.com/deeltv1ff/image/upload/v1741280681/nextjs_uploads/l9hfx2at2cojyu3crhy3.png",
            name: "Author name 4",
          },
        ],
      },
    }).as("getAuthors");

    // Intercept API request for blogs
    cy.intercept("GET", "**/api/blogs?page=*", {
      statusCode: 200,
      body: {
        success: true,
        blogs: [
          {
            id: 1,
            title: "First Blog",
            body: "This is a test blog.",
            blogCount: "3",
            postedDate: "2025-03-03 18:50:52.092",
            authorName: "testing 1",
            blogImgUrl:
              "https://res.cloudinary.com/deeltv1ff/image/upload/v1741027867/nextjs_uploads/vjquwufw4mg92dqrvplz.avif",
          },
          {
            id: 2,
            title: "Second Blog",
            body: "Another test blog.",
            blogCount: "4",
            postedDate: "2025-03-03 18:50:52.092",
            authorName: "testing 2",
            blogImgUrl:
              "https://res.cloudinary.com/deeltv1ff/image/upload/v1741029590/nextjs_uploads/uxacfq5qltxxnlcmcwlk.jpg",
          },
        ],
      },
    }).as("getPaginatedBlogs");

    // Profile page user details get api
    cy.intercept("GET", "**/api/auth/user", {
      statusCode: 200,
      body: {
        success: true,
        user: {
          id: 1,
          name: "Test User",
          email: "hassanarif1471@gmail.com",
          image:
            "https://res.cloudinary.com/deeltv1ff/image/upload/v1741029590/nextjs_uploads/uxacfq5qltxxnlcmcwlk.jpg",
        },
      },
    }).as("getUserDetails");

    // Update user details in profile page api
    cy.intercept("PUT", "**/api/auth/update-user", {
      statusCode: 200,
      body: {
        success: true,
        message: "User updated successfully",
      },
    });

    // get blogs for add blogs
    cy.intercept("GET", "**/api/auth/get-blogs", {
      statusCode: 200,
      body: {
        success: true,
        blogs: [
          {
            id: 1,
            title: "First Blog",
            body: "This is a test blog.",
            blogCount: "3",
            postedDate: "2025-03-03 18:50:52.092",
            authorName: "testing 1",
            blogImgUrl:
              "https://res.cloudinary.com/deeltv1ff/image/upload/v1741027867/nextjs_uploads/vjquwufw4mg92dqrvplz.avif",
          },
          {
            id: 2,
            title: "Second Blog",
            body: "Another test blog.",
            blogCount: "4",
            postedDate: "2025-03-03 18:50:52.092",
            authorName: "testing 2",
            blogImgUrl:
              "https://res.cloudinary.com/deeltv1ff/image/upload/v1741029590/nextjs_uploads/uxacfq5qltxxnlcmcwlk.jpg",
          },
        ],
      },
    });
    // Add blog Api
    cy.intercept("POST", "**/api/auth/add-blog", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          message: "Blog Added Successfully",
        },
      });
    }).as("addBlog");

    // Update blog Api
    cy.intercept("PUT", "**/api/auth/update-blog", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          message: "Blog Added Successfully",
        },
      });
    }).as("addBlog");

    // Delete blog Api
    cy.intercept("DELETE", "**/api/auth/delete-blog?blogId=1", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          message: "Blog Deleted Successfully",
        },
      });
    }).as("deleteBlog");

    // Logout Api
    cy.intercept("POST", "**/api/auth/logout", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          message: "Logged out successfully",
        },
      });
    }).as("logout");

    // Login Api
    cy.intercept("POST", "**/api/auth/login", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          message: "Login Successfull",
          token: "token123",
          user: {
            id: 1,
            name: "testing 1",
            email: "test1@gmail.com",
          },
        },
      });
    }).as("login");

    // Password reset api for otp
    cy.intercept("POST", "**/api/auth/password-reset", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          message: "Password Reset OTP Sent Successfully",
        },
      });
    }).as("forgotPassword");

    // Password reset api for new password
    cy.intercept("POST", "**/api/auth/reset-password", (req) =>
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          message: "Password Reset Successfully",
        },
      })
    ).as("resetPassword");

    // Intercept signup Api
    cy.intercept("POST", "**/api/auth/signup", (req) => {
      if (req.body.otp) {
        req.reply({
          statusCode: req.body.otp === "98000" ? 200 : 400,
          body: {
            success: req.body.otp === "98000",
            message:
              req.body.otp === "98000"
                ? "OTP verified successfully"
                : "Invalid OTP",
          },
        });
      } else {
        req.reply({
          statusCode: 200,
          body: {
            success: "pending",
            message: "An OTP has been sent to your email!",
          },
        });
      }
    }).as("registerUser");

    // Visit home page
    cy.visit("http://localhost:3000");
    cy.wait("@getAuthors");
    cy.wait("@getPaginatedBlogs");
  });

  it("Clicks all navbar links, navigates to register page, fills form, and submits", () => {
    // Test navbar links navigation first
    cy.get("ul a").each(($link, index) => {
      const href = $link.attr("href");
      if (href) {
        cy.wrap($link).click();

        // For register page specific tests
        if (href.includes("/register")) {
          // Remove nested it() blocks and convert to sequential commands
          cy.get('input[name="name"]').type("Test User");
          cy.get('input[name="email"]').type("hassanarif1471@gmail.com");
          cy.get('input[name="password"]').type("Test@1234");
          cy.get('input[name="confirm_password"]').type("Test@1234");
          cy.get("button[type='submit']").click();
          cy.wait("@registerUser");
          cy.get('input[name="otp"]').type("98000");
          cy.get('button[type="submit"]').click();
          cy.wait("@registerUser").then(() => {
            cy.setCookie("accessToken", "mock-access-token");
            cy.getCookie("accessToken").should("exist");
            cy.visit("http://localhost:3000");
          });

          // Profile page tests
          cy.visit("/profile");
          cy.contains("button", "Edit").click();
          cy.get('input[name="phone"]').type("0987654321");
          cy.get('input[name="address"]').type("Garden West Karachi");
          cy.get('select[name="Gender"]').select("Male");
          cy.contains("button", "Save").click();

          // Blog tests
          cy.visit("/add-blog");
          cy.get('input[name="blogTitle"]').type(
            "This blog title write by Cypress"
          );
          cy.get('select[name="blogCategory"]').select("Life");
          cy.get('input[type="file"]').selectFile(
            "C:/Users/Hassan/Downloads/Cartoon-Wallpaper.jpg",
            { force: true }
          );
          cy.get('textarea[name="blogBody"]').type(
            "This blog content write by cypress"
          );
          cy.contains("button", "Publish Blog").click();
          cy.wait(500);
          cy.contains("button", "Update").first().click();
          cy.get('input[name="blogTitle"]').type(
            "This blog title update by Cypress"
          );
          cy.get('select[name="blogCategory"]').select("Technology");
          cy.contains("button", "Update Blog").first().click();
          cy.contains("button", "Delete").first().click();
          cy.visit("/");

          // Logout test
          cy.contains("p", "Logout", { timeout: 10000 }).click({ force: true });

          // Login/password reset tests
          cy.wait(500);
          cy.visit("/login");
          cy.contains("a", "Forgot password?").click({ force: true });
          cy.get('input[name="email"]').type("testuser@gmail.com");
          cy.get('button[type="submit"]').click();
          cy.visit("/reset-password?email=testuser@gmail.com");
          cy.get('input[name="otp"]').type("98000");
          cy.get('input[name="password"]').type("87654321");
          cy.get('button[type="submit"]').click();
          cy.wait(1000);
          cy.get('input[name="email"]').type("testuser@gmail.com");
          cy.get('input[name="password"]').type("123456");
          cy.get('button[type="submit"]').click();
          cy.wait("@login").then(() => {
            cy.setCookie("accessToken", "mock-access-token");
            cy.getCookie("accessToken").should("exist");
            cy.visit("http://localhost:3000");
          });
          // Finally Logout
          cy.contains("p", "Logout", { timeout: 10000 }).click({ force: true });
        }

        // Navigation cleanup
        if (index < $link.length - 1) {
          cy.go("back");
          cy.wait(["@getAuthors", "@getPaginatedBlogs"]);
        }
      }
    });
  });
});