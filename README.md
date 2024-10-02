<div align= >

# <img align=center width=90px  src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzlubjllNGM4YTlydGdlY3BuNDdvNzgyNXhvYjJ0eTNvMGQzZGF3NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/KPYvDoGB4C45mEzawv/giphy.gif"> Nourflix

</div>
<div align="center">
   <img align="center"  width="500px" src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXlyd2VlZ2poazV2bzViZDV3Nm9wcWJhcDBzZGh6aTR6dnJyNTdoaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7qDV67vk5vYdoeVG/giphy.gif" alt="logo">

### ”You'll definitely want to see this. 👀“

</div>

<p align="center">
    <br>
</p>

## <img align= center width=50px height=50px src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzk1OG56bGE5cXV4Y2hiMnNsN3lmOXpmNTIzMDljdTh5eW9saTJxeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/XSmHWLpvdycR6xukzC/giphy.gif"> Table of Contents

- <a href ="#about"> 📙 Overview</a>
- <a href ="#started"> 💻 Get Started</a>
- <a href ="#features"> 🔍 Features</a>
- <a href ="#architecture"> 👀 Architecture</a>
- <a href ="#contributors"> ✨ Contributors</a>
- <a href ="#license"> 🔒 License</a>

<hr style="background-color: #4b4c60"></hr>

## <img align="center"  height =80px src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjBldmR0dHIybDV2dW45Z3E0YzdtOHNiNnNpcjVhc2JoYXV1d3llZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3ohzdG6mch98dP1JlK/giphy.gif"> Overview <a id = "about"></a>

<ul>

<li>
Welcome to Nourflix, the ultimate movie discovery platform! Nourflix provides comprehensive information about all your favorite films. Explore detailed movie descriptions, cast and crew details, and ratings to help you make informed choices on what to watch next. With Nourflix, you can create and personalize your own favorite movie list, making it easy to keep track of the films you love and those you plan to watch in the future. Whether you're a casual viewer or a dedicated cinephile, Nourflix is your go-to source for all things movies!
</li>
<br>
<li>The project is built by
<ol>

<li>
<a href="https://nextjs.org/">Next.js</a>
</li>
<li>
<a href="https://eslint.org/">eslint</a>
</li>
<li>
<a href="https://www.axios.com/">axios</a>
</li>
</ol>
</li>

<br>
<li>
You can view
<a href="https://nouralmulhem.github.io/Nourflix/">Nourflix</a>,
you might find the platform not deployed yet, until the GitHub repository is public
</li>
</ul>
<hr style="background-color: #4b4c60"></hr>

## <img  align= center width=50px height=50px src="https://c.tenor.com/HgX89Yku5V4AAAAi/to-the-moon.gif"> Get Started <a id = "started"></a>

<ol>
<li>Clone the repository

<br>

```
git clone https://github.com/nouralmulhem/Nourflix.git
```

</li>
<li>Install packages

<br>

```
bun install
```

</li>
<li>Run the development server:

<br>

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

</li>
</ol>
<hr style="background-color: #4b4c60"></hr>

## <img  align= center width= 70px height =70px src="https://media1.giphy.com/media/NnSFnC428LRHaxUNzj/giphy.gif?cid=ecf05e47r1hlw9wrf1swakc9gxgn508lyzvbyzgp9i1iyvwl&rid=giphy.gif&ct=s"> Features <a id ="features"></a>

<hr style="background-color: #4b4c60"></hr>

<table align="left;">
<tr>
<th width=20%>Feature</th>
<th width=50%>ScreenShot</th>
<th>Description</th>
</tr>

<tr>
<td>
🔶 Home Page
</td>
<td>

   <img align="center"  src="./images/home.png" alt="logo">
</td>
<td>
<ul>
<li>Search</li>
<li>Filter by Genre</li>
<li>Pagination</li>
<li>Animation</li>
</ul>
</td>
</tr>

<tr>
<td>
🔷 Movie Page
</td>
<td>

   <img align="center"  src="./images/movie.png" alt="logo">
</td>
<td>
<ul>
<li>Movie Details</li>
<li>Cast</li>
</ul>
</td>
</tr>

<tr>
<td>
🔶 Favorites Page
</td>
<td>

   <img align="center"  src="./images/fav.png" alt="logo">
</td>
<td>
<ul>
<li>Favorite Movies</li>
<li>Remove from list</li>
<li>Animated removal</li>
</ul>
</td>
</tr>
</table>
</br>

<hr style="background-color: #4b4c60"></hr>

## <img align="center"  height =80px src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGxnaGhsYzdhbDJhcHQ4ZW1qb2hjMmhyOWw0Ym1hdnBpa2pna204ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/JQ9FHhns6CPwKuIoYZ/giphy.gif"> Architecture <a id = "architecture"></a>

### Project Architecture

```plaintext
|-- app/
|   |-- layout.tsx/
|   |-- page.tsx/
|   |-- favorite/
|       |-- page.tsx
|   |-- movie/
|       |-- [id]/
|           |-- page.tsx
|-- components/
|   |-- Dashboard/
|       |-- Dashboard.tsx
|       |-- dashboard.module.css
|   |-- Favorite/
|       |-- Favorite.tsx
|       |-- favorite.module.css
|-- design-system/
|   |-- CloseIcon/
|       |-- CloseIcon.tsx
|       |-- close-icon.module.css
|   |-- Spinner/
|       |-- Spinner.tsx
|       |-- spinner.module.css
|-- widgets/
|   |-- Notification/
|       |-- Notification.tsx
|       |-- notification.module.css
|-- hooks/
|   |-- useFetch.ts
|-- services/
|   |-- getMovieById.ts
|   |-- getMovies.ts
|-- store/
|   |-- notification.ts
|   |-- genre.ts
|-- utils/
|   |-- convertToHours.ts
|-- next.config.js
|-- tsconfig.json
```

<br>

- I structured the architecture by organizing pages, client components, design system (reusable) components, and stand-alone widget components into separate modules.

- I also separated all hooks, service interaction utilities, and logic into distinct directories.

- This approach enables more efficient and focused consideration of SSR and CSR components while simplifying both state management and UI rendering.

### Bonus Points

- Implementing server-side rendering for key high-level components.

- Providing user notifications and ensuring smooth interactions.

- Ensuring a fully responsive design, compatible with both desktop and mobile devices.

- Adding animated actions, such as smoothly removing a movie from the favorites list.

<br>

<hr style="background-color: #4b4c60"></hr>

## <img  align="center" width= 70px height =55px src="https://media0.giphy.com/media/Xy702eMOiGGPzk4Zkd/giphy.gif?cid=ecf05e475vmf48k83bvzye3w2m2xl03iyem3tkuw2krpkb7k&rid=giphy.gif&ct=s"> Contributors <a id ="contributors"></a>

<table  >
  <tr>
     <td align="center"><a href="https://github.com/nouralmulhem"><img src="https://avatars.githubusercontent.com/u/76218033?v=4" width="150px;" alt=""/><br /><sub><b>Nour Ziad Almulhem</b></sub></a><br /></td>
  </tr>
</table>

## 🔒 License <a id ="license"></a>

> **Note**: This software is licensed under MIT License, See [License](https://github.com/nouralmulhem/Nourflix/blob/main/LICENSE) for more information ©Nourflix.
