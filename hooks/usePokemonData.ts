import { useState, useEffect } from "react";

interface PokemonData {
  name: string;
  image: string;
  type: string;
}

/**
 * Hook personalizado para recuperar y gestionar datos de Pokemon.
 *
 * @return {PokemonData | undefined} Los datos de Pokemon recuperados de la API, siendo los unicos salvados en el estado: nombre, imagen y tipo.
 * Se devuelve un loading si la llamada a la API falla.
 * Se hace una llamada a la API cada vez que se cambia el id de pokemon, gracias al useEffect.
 */
const usePokemonData = () => {
  const [pokemonData, setPokemonData] = useState<PokemonData>();
  const [idPokemon, setIdPokemon] = useState(1);

  useEffect(() => {
    window.addEventListener("randomNumberResult", (event) => {
      setIdPokemon(event.detail.result[1]);
    });

    return () => {
      window.removeEventListener("randomNumberResult", (event) => {});
    };
  }, []);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
        );
        if (response.ok) {
          const data = await response.json();
          const pokemonInfo = {
            name: data.name,
            image: data.sprites.front_default,
            type: data.types[0].type.name,
          };
          setPokemonData(pokemonInfo);
        } else {
          throw new Error("Error consumiendo el api de pokemon");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonData();
  }, [idPokemon]);

  return pokemonData;
};

export default usePokemonData;
