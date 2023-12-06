# A small task from veziv.ro

### Structure

| Path     | Technologies           | Content                                                          |
| -------- | ---------------------- | ---------------------------------------------------------------- |
| `server` | NestJS,TypeORM,Mysql   | The backend (server side)                                        |
| `client` | React,Vite,Tailwindcss | The frontend (client side)                                       |
| `shared` | d.ts declarations      | The type declarations which are shared between client and server |

### Images

<details>
<summary>Home page</summary>
<img src="https://i.imgur.com/KbLo2kC.png" />
</details>

<details>
<summary>My account page (My Profile)</summary>
<img src="https://i.imgur.com/ghqwIgx.png" />
</details>

<details>
<summary>My account page (My Portfolios)</summary>
<img src="https://i.imgur.com/zTxr7tQ.png" />
</details>

<details>
<summary>Search user page</summary>
<img src="https://i.imgur.com/WRQ3qxQ.png" />
</details>

<details>
<summary>Search user page (user info)</summary>
<img src="https://i.imgur.com/leH5JJ4.png" />
</details>

<details>
<summary>Search user page (user portfolio preview)</summary>
<img src="https://i.imgur.com/dBeap76.png" />
</details>

<details>
<summary>Login page</summary>
<img src="https://i.imgur.com/Fr5rH8G.png" />
</details>

<details>
<summary>Register page</summary>
<img src="https://i.imgur.com/SgP3JRL.png" />
</details>

<details>
<summary>Modal (confirm)</summary>
<img src="https://i.imgur.com/VMryNlh.png" />
</details>

<details>
<summary>Modal (prompt)</summary>
<img src="https://i.imgur.com/yzuzhk2.png" />
</details>

### Setting up

1. Clone this repository
2. Install node dependencies
3. Make sure you have the mysql server (you can download mysql from chocolatey if you testing from windows) or you can also create a dockerfile
4. Create a copy of `.env.example` from server path then rename it to `.env` and complete the variables
5. Run `npm run dev`
6. Visit `http://localhost:5173`
