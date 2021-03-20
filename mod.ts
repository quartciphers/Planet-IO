import {join} from  "https://deno.land/std/path/mod.ts";
import {BufReader} from "https://deno.land/std@0.90.0/io/bufio.ts";
import {parse} from "https://deno.land/std@0.90.0/encoding/csv.ts";


interface Planet {
  [key : string ] : string ;
}

async function readFile() {
    const path = join(".","kepler_exoplanets_nasa.csv");
    const file  = await Deno.open(path);
    const bufreader = new BufReader(file);
  const result =  await parse(bufreader,{
     
    skipFirstRow: true,
      comment : "#"

  });

  Deno.close(file.rid);

 const planets= (result as Array<Planet>).filter((planet)=>{
    
   const planetRadius = Number( planet["koi_prad"]);
   const stellarMass = Number(planet["koi_smass"]);
   const stellarRadius = Number(planet["koi_srad"]);

return planet["koi_disposition"] === "CONFIRMED" && planetRadius > 0.5 &&  planetRadius < 1.5 && stellarMass > 0.78 && stellarMass <1.04 && stellarRadius > 0.99 && stellarRadius < 1.01;

 });

   return planets;
    
}


  const newEarths =  await readFile();
  
  console.log(`${newEarths.length} habitatual plantes`);
  
