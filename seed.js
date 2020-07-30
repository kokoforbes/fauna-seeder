const { client, query } = require("./graphql/db-connection");
const q = query;
const simpleIcons = require("simple-icons");
const reposData = require("./data.json");

const repos = reposData.map((r) => {
  const simpleIconsData = simpleIcons.get(r.simpleIconsName);
  r.svgLogo = simpleIconsData.svg;
  r.colorHex = simpleIconsData.hex;
  delete r.simpleIconsName;
  return r;
});

client
  .query(
    q.Map(
      repos,
      q.Lambda(
        "repo",
        q.Create(q.Collection("Repo"), {
          data: q.Var("repo"),
        })
      )
    )
  )
  .then(console.log("Repos seeded successfully to FaunaDB"))
  .catch((err) => console.log("Failed to seed repos to FaunaDB", err));