package com.BattleShip.BattleShip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.*;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/api")


public class SalvoController {

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
                DTO.put("gamePlayers",game.getGamePlayer().stream()
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
                Map<String, Object> DTO= new HashMap<>();
                DTO.put("Game",makeGameDTO(gamep.getGame()));
                DTO.put("Ships",ships.stream()
                        .map(ss -> makeShipDTO(ss)).collect(toList()));
                return DTO;
        }

        private Map<String, Object> makeShipDTO(Ship ship){
                Map<String, Object> DTO= new HashMap<>();
                DTO.put("type", ship.getShipType());
                DTO.put("location", ship.getLocation());
                return DTO;
        }
}
