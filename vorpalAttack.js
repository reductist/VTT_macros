(() => {
  function chat(message) {
    let chatData = {
      user: game.user._id,
      speaker: ChatMessage.getSpeaker(),
      content: message
    };
    ChatMessage.create(chatData, {});
  };
  let hero = game.data.actors.[game.data.actors.length - 1]);
  let prof = hero.data.attributes.prof;
  let strmod = hero.data.abilities.str.mod;
  /* examples
   * hero.data.attributes.ac
   * hero.data.attributes.prof
   * hero.data.abilities.wis
   */
  let attack = new Roll('1d20').roll().total + prof + strmod;
  let damage = new Roll('1d10').roll().total + strmod;
  let messageContent = `Bam! ${damage} damage (attack ${attack})`;
  if (attack == 20) {
    // add extra damage
    damage += new Roll('1d10').roll().total;
    messageContent = `I chopped your dick off for ${damage} damage (attack ${attack})`;
  }
chat(messageContent);
}
)();
