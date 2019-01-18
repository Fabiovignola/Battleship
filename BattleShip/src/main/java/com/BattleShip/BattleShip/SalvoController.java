package com.BattleShip.BattleShip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/api")


public class SalvoController {

        ///////INYECCION DE DEPENDENCIAS/////
        @Autowired
        private GameRepository gamerepo;
        @Autowired
        private GamePlayerRepository gameprepo;


        @RequestMapping("/games")
        public List<Object> getAllGame(){
            return gamerepo.findAll().stream()
                        .map(g -> makeGameDTO(g))
                        .collect(toList());
        }
        private Map<String, Object>  makeGameDTO(Game game){
                Map<String, Object> DTO= new LinkedHashMap<>();
                DTO.put("id",game.getId());
                DTO.put("date",game.getdate());
                DTO.put("gamePlayers",game.getGamePlayers().stream()
                        .map(gp -> makeGamePlayerDTO(gp)).collect(toList()));
                return DTO;
        }

        private Map<String, Object>  makeGamePlayerDTO(GamePlayer gameplayer){
                Map<String, Object> DTO= new HashMap<>();
                DTO.put("id", gameplayer.getId());
                DTO.put("player", makePlayerDTO(gameplayer.getPlayer()));
                return DTO;
        }

        // aquí creo un Map para el player que se me pasa de parametro
        private Map<String, Object>  makePlayerDTO(Player player){
                Map<String, Object> DTO= new HashMap<>();
                DTO.put("id",player.getId());
                DTO.put("email", player.getUserName());
                return DTO;
        }


        @RequestMapping("/game_view/{nn}")
        public Map<String,Object> gameView(@PathVariable Long nn){
                GamePlayer gamep = gameprepo.findById(nn).orElse(null);
                Set<Ship> ships = gamep.getShips();
                Set<GamePlayer> setgps = gamep.getGame().getGamePlayers();

                Map<String, Object> DTO= new LinkedHashMap<>();
                DTO.put("Game",makeGameDTO(gamep.getGame()));
                DTO.put("Ships",ships.stream()
                        .map(ship -> makeShipDTO(ship)).collect(toList()));
                DTO.put("Salvos", setgps.stream()
                        .map(GamePlayer -> makeSalvosDTO(GamePlayer.getSalvos())));
                return DTO;
        }

        private Map<String, Object> makeShipDTO(Ship ship){
                Map<String, Object> DTO= new HashMap<>();
                DTO.put("type", ship.getShipType());
                DTO.put("location", ship.getLocation());
                return DTO;
        }

        private Map<String, Object> makeSalvosDTO(Set<Salvo> salvos){
                Map<String, Object> DTO = new HashMap<>();
                DTO.put("Salvos", salvos.stream()
                .map(salvo -> makeSalvoDTO(salvo)).collect(toList()));
                return DTO;
        }

        private Map<String, Object> makeSalvoDTO(Salvo salvo){
                Map<String, Object> DTO= new HashMap<>();
                DTO.put("idGP", salvo.getGamePlayer().getId());
                DTO.put("turn", salvo.getTurn());
                DTO.put("location", salvo.getLocation());
                return DTO;
        }

        ///makes setscoresdto
//        private Map<String, Object> makeSalvoDTO(Player player) {
////                Map<String, Object> DTO= new HashMap<>();
////                DTO.put("idGP", salvo.getGamePlayer().getId());
////                DTO.put("turn", salvo.getTurn());
////                DTO.put("location", salvo.getLocation());
////                return DTO;
//        }


         private Map<String, Object> countScores (Set<Score> Scores){
                Map<String, Object> DTO= new HashMap<>();
                ////TOTAL SCORE////
                Double totalscore = 0.0;
                for(Score score : Scores){
                        totalscore += score.getScore();
                }
                DTO.put("total", totalscore);
                System.out.println(DTO);
                ////TOTAL WIN/////
                Integer totalwin = 0;
                Integer totaloose = 0;
                Integer totaltied = 0;
                 for(Score score : Scores){
                         if(score.getScore() == 1.0){
                                 totalwin += 1;
                         }
                         if(score.getScore() == 0.5){
                                 totaltied += 1;
                         }
                         if(score.getScore() == 0.0){
                                 totaloose += 1;
                         }
                 }
                 DTO.put("win", totalwin );
                 DTO.put("lose", totaloose);
                 DTO.put("tied", totaltied);
                 return DTO;

                 ///////////////////////








        }
}
