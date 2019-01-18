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


         Map<String, Object> makeScoreDTO (Set<Score> Scores){
                Map<String, Object> DTO= new HashMap<>();
                ////TOTAL SCORE////
                Double totalscore = 0.0;
                for(Score score : Scores){
                        totalscore += score.getScore();
                }
                DTO.put("total", totalscore);
                System.out.println(DTO);
                return DTO;
                ////TOTAL WIN/////
                Integer totalwin = 0;
                Integer totaloose = 0;
                 for(Score score : Scores){
                         if(Scores == 1.0)
//                         totawin += score.getScore();
                 }
                 DTO.put("total", totawin);
                 ///////////////////////








        }

//        Pub
//                for (Product product : this.products){
//                total += product.getPrice();
//
//                if (counter.containsKey(product.getName())) {
//                        Integer value = counter.get(product.getName());
//                        value++;
//                        if (value ==4){
//                                total -= product.getPrice();
//                                value = 0;
//                        }
//                        counter.put(product.getName(), value);
//                }else{
//                        counter.put(product.getName(),1);
//                }
//
//        }





}
