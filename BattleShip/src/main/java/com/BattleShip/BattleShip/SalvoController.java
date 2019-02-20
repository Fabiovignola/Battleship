package com.BattleShip.BattleShip;

import org.hibernate.loader.plan.spi.Return;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toSet;


@RestController
@RequestMapping("/api")


public class SalvoController {

        ///////INYECCION DE DEPENDENCIAS/////
        @Autowired
        private GameRepository gamerepo;
        @Autowired
        private GamePlayerRepository gameprepo;
        @Autowired
        private PlayerRepository plaprepo;
        @Autowired
        private ShipRepository shiprepo;
        @Autowired
        private SalvoRepository salvoprepo;

        @RequestMapping("/games")
        public  Map<String, Object> getAllGame(Authentication authentication){
                Map<String, Object> DTO= new HashMap<>();
                DTO.put("allGame", gamerepo.findAll().stream()
                        .map(g -> makeGameDTO(g))
                        .collect(toList()));
                DTO.put("allScores", plaprepo.findAll().stream()
                        .map(l -> makeSetScoresDTO(l))
                        .collect(toList()));
                if(authentication != null){
                        DTO.put("player", makePlayerDTO(currentUser(authentication)));
                }else {
                        DTO.put("player", null);
                }
                return DTO;
        }

        @RequestMapping(path = "/games", method = RequestMethod.POST)
        public ResponseEntity<Map<String, Object>> createGame(Authentication authentication){
                if(authentication == null){
                        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }else {
                        Game newGame = new Game();
                        gamerepo.save(newGame);
                        GamePlayer newGamePlayer = new GamePlayer(currentUser(authentication), newGame);
                        gameprepo.save(newGamePlayer);
                        return new ResponseEntity<>(makeNewGame("id", newGame.getId()),HttpStatus.CREATED);
                }
        }

        private Map<String, Object> makeNewGame(String key, Object value) {
                Map<String, Object> map = new HashMap<>();
                map.put(key,value);
                return map;
        }

        @RequestMapping(path = "/game/{nn}/players", method = RequestMethod.POST)
        public ResponseEntity<Map<String, Object>> joinGame(@PathVariable Long nn, Authentication authentication) {
                if (authentication == null) {
                        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
                Game game = gamerepo.findOne(nn);
                if (authentication != null) {
                        if (game == null) {
                                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
                        }
                        if (game.getGamePlayers().size() == 2) {
                                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
                        }
                }
                if(game.getPlayers().contains(currentUser(authentication))){
                        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
                }
                GamePlayer newGamePlayerDos = new GamePlayer(currentUser(authentication), game);
                gameprepo.save(newGamePlayerDos);
                return new ResponseEntity<>(makeNewUserMap("id", newGamePlayerDos.getId()),HttpStatus.CREATED);
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
        public ResponseEntity<Map<String,Object>> gameView(@PathVariable Long nn, Authentication authentication){
                GamePlayer gamep = gameprepo.findOne(nn);
                Set<Ship> ships = gamep.getShips();
                Set<GamePlayer> setgps = gamep.getGame().getGamePlayers();

                Map<String, Object> DTO= new LinkedHashMap<>();
                DTO.put("Game",makeGameDTO(gamep.getGame()));
                DTO.put("Ships",ships.stream()
                        .map(ship -> makeShipDTO(ship)).collect(toList()));
                DTO.put("Salvos", setgps.stream()
                        .map(GamePlayer -> makeSalvosDTO(GamePlayer.getSalvos())).collect(toList()));

                if(authentication != null ){
                       if(currentUser(authentication).getId() == gamep.getPlayer().getId()){
                               return new ResponseEntity<>(DTO,HttpStatus.CREATED);
                       }
                }else {
                        return new ResponseEntity<>(HttpStatus.CONFLICT);
                }
                return new ResponseEntity<>(HttpStatus.CONFLICT);
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

        private Map<String, Object> makeSetScoresDTO(Player player) {
                Map<String, Object> DTO= new HashMap<>();
                DTO.put("email", player.getUserName());
                DTO.put("player", countScores(player.getScores()));
                return DTO;
        }

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
                 DTO.put("win", totalwin);
                 DTO.put("lose", totaloose);
                 DTO.put("tied", totaltied);
                 System.out.println(DTO);
                 return DTO;

                 ///////////////////////








        }

        public Player currentUser(Authentication authentication) {
                return plaprepo.findByuserName(authentication.getName());
        }

        private boolean isGuest(Authentication authentication) {
                return authentication == null || authentication instanceof AnonymousAuthenticationToken;
        }

        @RequestMapping(path = "/players", method = RequestMethod.POST)
        public ResponseEntity<Map<String, Object>> createUser(@RequestParam String userName, @RequestParam String password) {
                if (userName.isEmpty() || password.isEmpty()) {
                        return new ResponseEntity<>(makeNewUserMap("error", "No name"), HttpStatus.FORBIDDEN);
                }
                Player player = plaprepo.findByuserName(userName);
                if (player != null) {
                        return new ResponseEntity<>(makeNewUserMap("error", "Username already exists"), HttpStatus.CONFLICT);
                }
                Player newPlayer = plaprepo.save(new Player(userName, password));
                return new ResponseEntity<>(makeNewUserMap("name", newPlayer.getId()),HttpStatus.CREATED);
        }

        private Map<String, Object> makeNewUserMap(String key, Object value) {
                Map<String, Object> map = new HashMap<>();
                map.put(key,value);
                return map;
        }

        @RequestMapping(path="/games/players/{nn}/ships", method=RequestMethod.POST)
        public ResponseEntity<Map<String, Object>> createShip(@PathVariable long nn, @RequestBody Set<Ship> listship ,Authentication authentication) {

                GamePlayer gamep = gameprepo.findOne(nn);

                if(authentication == null){
                        return new ResponseEntity<Map<String, Object>>(makeNewUserMap("error", "PLEASE LOGIN"), HttpStatus.UNAUTHORIZED);
                }
                if(gamep == null){
                        return new ResponseEntity<Map<String, Object>>(makeNewUserMap("error", "NO SUCH GAMEPLAYER"), HttpStatus.UNAUTHORIZED);
                }

                if(currentUser(authentication) != gamep.getPlayer()){
                        return new ResponseEntity<Map<String, Object>>(makeNewUserMap("error", "NO SUCH"), HttpStatus.UNAUTHORIZED);
                }
                if(gamep.getShips().size() > 0){
                        return new ResponseEntity<Map<String, Object>>(makeNewUserMap("error", "NO SHIP"), HttpStatus.FORBIDDEN);
                }
                for(Ship ship : listship) {
//                addShip.set(addShip());
//                        pet.setOwner(person);
                        gamep.addShip(ship);
                        shiprepo.save(ship);
                }
                return new ResponseEntity<Map<String, Object>>(makeNewUserMap("ship", "ship created"),HttpStatus.CREATED);
        }

        @RequestMapping(path="/games/players/{nn}/salvos", method=RequestMethod.POST)
        public ResponseEntity<Map<String, Object>> createSalvo(@PathVariable long nn, @RequestBody Salvo salvo ,Authentication authentication) {

                GamePlayer gamep = gameprepo.findOne(nn);

                if(authentication == null){
                        return new ResponseEntity<Map<String, Object>>(makeNewUserMap("error", "PLEASE LOGIN"), HttpStatus.UNAUTHORIZED);
                }
                if(gamep == null){
                        return new ResponseEntity<Map<String, Object>>(makeNewUserMap("error", "NO SUCH GAMEPLAYER"), HttpStatus.UNAUTHORIZED);
                }

                if(currentUser(authentication) != gamep.getPlayer()){
                        return new ResponseEntity<Map<String, Object>>(makeNewUserMap("error", "NO SUCH"), HttpStatus.UNAUTHORIZED);
                }
                        gamep.addSalvo(salvo);
                        salvoprepo.save(salvo);
                return new ResponseEntity<Map<String, Object>>(makeNewUserMap("salvo", "SALVO CREATE"),HttpStatus.CREATED);
        }
        }

