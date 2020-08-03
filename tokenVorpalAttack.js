// store an array of selected tokens
const tokens = canvas.tokens.controlled;
const [myToken] = tokens;

// attackVorpal :: tokenObject -> Function
const attackVorpal = (token) => {
  // exit early if token is an npc or more than one token is selected
  if (token.data.type === "npc" || token.length > 0) return;

  // messageDispatch :: number -> number -> string
  const messageDispatch = (attack) => (damage) => {
    const dispatchTable = [
      {
        condition: (attack < 10),
        message: `Bam! ${damage} damage (attack ${attack})`,
      },
      {
        condition: (attack >= 10),
        message: `I chopped your dick off for ${damage} damage (attack ${attack})`,
      },
      // add more if so desired
    ];
    dispatchTable.forEach( (scenario) => {
      if (scenario.condition) {
        return scenario.message;
      }
    })
  };

  // damageRollN :: number -> number
  const damageRollN = (n) => new Roll(`${n}d10`).roll().total;
  // attackRoll :: void -> number
  const attackRoll = () => new Roll('1d20').roll().total;

  const vorpalConfigs = {
    tokenActor: token.actor,
    pb: this.tokenActor.data.attributes.prof,
    strmod: this.tokenActor.data.abilities.str.mod,
    attack: attackRoll() + this.pb + this.strmod,
    damage: (this.attack >= 10) ? ( damageRollN(1) + this.strmod ) : ( damageRollN(2) + this.strmod ),
    message: messageDispatch(this.attack)(this.damage),
  };

  // printMessage :: object -> void
  const printMessage = (configObject) => {
    ChatMessage.create({
      user: game.user._id,
      speaker: ChatMessage.getSpeaker(),
      content: configObject.message,
    }, {});
  };

  return printMessage(vorpalConfigs);
}

// trigger
attackVorpal(myToken);
