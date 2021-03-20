const emoteImageBasePath = "/assets/chat emotes";

export const emoteCodes = [
  'tubD', 
  'woo',
];

export let emoteMap = {}; 

for (let i = 0; i < emoteCodes.length; i++) {
  emoteMap[emoteCodes[i]] = {
    imagePath: `${emoteImageBasePath}/${emoteCodes[i]}.gif`
  };
};
