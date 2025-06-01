import express from "express";
import { Pool } from "pg";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

app.use("/assets", express.static("src/assets"));
app.use(express.urlencoded({ extended: false }));

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        partialsDir: path.join(__dirname, "src/views/partials"),
        layoutsDir: path.join(__dirname, "src/views/layouts"),
        defaultLayout: "main",
    })
);

// halaman utama
app.get("/", home);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

const db = new Pool({
    user: "postgres",
    password: "pgadmin61",
    host: "localhost",
    port: 5432,
    database: "porto",
    max: 20,
});
// date format
const formatMonthYear = date => {
    if (!date) return null;
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

// menampilkan halaman home
async function home(req, res) {

    const readProject = `SELECT * FROM project ORDER BY id`
    const projectList = await db.query(readProject)

    const readExperience = `SELECT * FROM experience ORDER BY id`
    const experienceList = await db.query(readExperience)

    const readTechnology = `SELECT * FROM tech ORDER BY nametech`
    const technologyList = await db.query(readTechnology)

    const experience = experienceList.rows.map(data => ({
        id: data.id,
        namejob: data.namejob,
        company: data.company,
        activity: data.activity,
        technology: data.technology,
        datestart: formatMonthYear(data.datestart),
        dateend: data.dateednd ? formatMonthYear(data.dateend) : 'Present',
        logo: data.logo ? `data:image/png;base64,${data.logo.toString('base64')}` : `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
    }));

    const technology = technologyList.rows.map(data => ({
        nametech: data.nametech,
        icon: data.icon ? `data:image/png;base64,${data.icon.toString('base64')}` : `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
    }));

    const project = projectList.rows.map(data => ({
        id: data.id,
        nameproject: data.nameproject,
        description: data.description,
        technology: data.technology,
        gitrepo: data.gitrepo,
        demo: data.demo,
        pic: data.pic ? `data:image/png;base64,${data.pic.toString('base64')}` : `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`

    }));
    console.log(projectList.rows)

    res.render("index", { experience, technology, project, title: "Home Page" });
}