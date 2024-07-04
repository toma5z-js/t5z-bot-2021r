 

//////////////////////////////////////////////////////
//node js v12.2
/////////////////////////////////////////////////////

const Discord = require("discord.js");
const { config } = require("process");
const client = new Discord.Client();
const configs = require("./config.json");
client.config = configs;
const version = "2.0.0 "; /// Bot version

const dev = " | Author: tom " ;

// change:

const footer = ' © ProjectFIVE.PL | ';
const iconurl = "https://cdn.discordapp.com/attachments/940014203467608124/967783652467539968/lgoov.png";




client.login(configs.token)
  .then(
    () => {
      console.log("bot started");
    },
    () => {
      client.destroy();
      console.log("ERROR!");

    });


//status

const activities_list = configs.statusactivities; // creates an arraylist containing phrases you want your bot to switch through.
  
  client.on('ready', () => {
      setInterval(() => {
          const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
          client.user.setActivity(activities_list[index]); 
      }, 1000); // Runs this every 10 seconds.
  });



//



client.on("message", async message => {



  const bpermisji ={
    color : 0xfccb6c, 
    author :{
  
      name : footer,
      icon_url : iconurl
    },
  
    
  title : "Nie posiadasz wystarczajaco permisji ",
    description : `${message.author} Nie mozesz tego zrobic. Nie jestes administratorem `, 
  footer :{
    text: footer + dev,
    icon_url: iconurl,
  },
    };










  if(message.author.bot) return;


  if(!message.content.startsWith(configs.prefix)) return;

  const args = message.content.slice(configs.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  



  const ntak ={
    color : 0xfccb6c, 
    author :{

      name : footer,
      icon_url : iconurl
    },

    
	title : "Cos poszlo nie tak ",
    description : ' Spróbuj oznaczyc ta osobę jeszcze raz! ', 
	footer :{
		text: footer  + dev,
		icon_url: iconurl,
	},
    };









  const zweryfikowano ={
    color : 0xfccb6c, 
    author :{
  
      name : footer,
      icon_url : iconurl
    },
  
    
  title : "Gratulacje!",
    description : ' Pomyślnie zweryfikowano. Życzymy miłej gry! ', 
  footer :{
    text: `${footer} Weryfikacja` + dev,
    icon_url: iconurl,
  },
    };
  
  
  if(command==="verify"){
  
   const uzytkonik = message.guild.roles.cache.find(r => r.id == configs.verifyrole)
  
   message.member.roles.add(uzytkonik)
   message.delete().catch(O_o=>{});
   message.author.send({embed:zweryfikowano})
  
  
  }
  

// STREFA WL


  





  if(command==="zdane"){
    if(!message.member.roles.cache.some(r=>(configs.modroles, configs.adminroles).includes(r.id)) ) // you have to create this role and give it to the mod
    return message.channel.send({embed : bpermisji });
    const zdana = message.guild.roles.cache.find(r => r.id == configs.zdanerole )
    const zweryfikowany = message.guild.roles.cache.find(r => r.id == configs.verifyrole )

    let member = message.mentions.members.first();

      let hex = args.slice(1).join()

    member.roles.add(zdana)
    member.roles.remove(zweryfikowany)
    client.channels.cache.get(configs.wlresultchannel).send("Pomyślnie przyjęto na serwer uzytkownika <@" + member +">. Hex:  " + hex)

   }
   


   if(command==="niezdane"){
    if(!message.member.roles.cache.some(r=>(configs.modroles, configs.adminroles).includes(r.id)) ) // you have to create this role and give it to the mod
    return message.channel.send({embed : bpermisji });

    let member = message.mentions.members.first();


    client.channels.cache.get(configs.wlresultchannel).send("Pomyślnie oblano uzytkownika <@" + member +"> ")
   
   
   }


   
   
 


// blacklist
if(command==="blacklist"){
  if(!message.member.roles.cache.some(r=>configs.modroles.includes(r.id)) ) // you have to create this role and give it to the mod
  return message.channel.send({embed : bpermisji });
  const blacklist = message.guild.roles.cache.find(r => r.id == configs.blacklistrole )




  let member = message.mentions.members.first();

  let powod = args.slice(1).join()
  member.roles.add(blacklist)



  const blacklisted ={
    color : 0x0f0f0f, 
    author :{
  
      name : `${footer} Blacklist `,
      icon_url : iconurl
    },
  
  
    title : "Dodano blacklist list dla użytkownika o ID: "+member,
    description : ` Nick użytkownika: <@` +member +">  Powód: " + powod, 
    footer :{
    text: footer + message.author.tag,
    icon_url: message.author.displayAvatarURL({ format: 'png' }),
  },
    };
  











  client.channels.cache.get(configs.blacklistchannel).send({embed : blacklisted})
 
 }


















// okienko


const okienko1 ={
  color : 0x43e043, 
  author :{

    name : footer,
    icon_url : iconurl
  },

  
title : "Okienko zostało otwarte! ",
  description : "Aby wszystko poszło szybko i zgrabnie prosimy o przygotowanie: \n 1. Zarys swojej postaci (to co mniej więcej chcesz odgrwyać) \n 2. Identyfikator HEX (Znajdziecie go na [tutaj](https://vacbanned.com)) \n 3. Zapoznanie się z regułami serwera (Znajdziecie je [tutaj](https://ProjectFIVE.pl/regulamin))  ", 
footer :{
  text: `Osoba pytająca: ${message.author.tag}`,
  icon_url: message.author.displayAvatarURL({ format: 'png' })
},
  };


  if(command==="otworzokienko"){
    if(!message.member.roles.cache.some(r=>configs.modroles.includes(r.id)) ) // you have to create this role and give it to the mod
    return message.channel.send({embed : bpermisji });



    client.channels.cache.get(configs.okienkochannel).send(`@${configs.verifyrole}`)
    client.channels.cache.get(configs.okienkochannel).send({embed:okienko1})
   
   
   }
   











   const okienko2 ={
    color : 0xC41414, 
    author :{
  
      name : footer,
      icon_url : iconurl
    },
  
    
  title : "Okienko zostało zamknięte! ",
    description : " Zapraszamy ponownie wkrótce! ", 
  footer :{
    text: `Osoba zamykająca okienko: ${message.author.tag}`,
    icon_url: message.author.displayAvatarURL({ format: 'png' })
  },
    };
  
  


    if(command==="zamknijokienko"){
      if(!message.member.roles.cache.some(r=>configs.modroles.includes(r.id)) ) // you have to create this role and give it to the mod
      return message.channel.send({embed : bpermisji });
  
  
  
      client.channels.cache.get(configs.okienkochannel).send({embed:okienko2})
     
     
     }
     





















  
  if(command === "ping") {
  
   

    const m = await message.channel.send("Ping?");
    const pingembed={
 
      color : 0xfccb6c, 
      author :{
    
        name : footer,
        icon_url : iconurl
      },
    
      
    title : `Twoj ping:  `,
    description : `${message.author} Twoj ping to:  ${m.createdTimestamp - message.createdTimestamp}ms.` ,
    footer :{
    text: footer +dev,
    icon_url: iconurl,



    
    },
      };
          
    
    message.channel.send({embed : pingembed});
  }
    

 


    


  
  if(command === "powiedz") {

    if(!message.member.roles.cache.some(r=>(configs.viprole, configs.adminroles, configs.modroles).includes(r.id)) ) // you have to create this role and give it to the mod
    return message.channel.send({embed : bpermisji });
    
    let person = message.member.displayName




    const sayMessage ={
      


      color : 0xfccb6c, 
      author :{
        name : footer,
        icon_url : iconurl
      },
    
      
      title : `${person}:`,
      description :  args.join(" "),
      footer :{
      text: footer+ dev,
      icon_url: iconurl,
    },
      };

    message.delete().catch(O_o=>{}); 
    message.channel.send({embed : sayMessage});
  }









////////////////////////////////////////////////////
let reason = args.slice(1).join(' ');
if(!reason) reason = " - ";


const zbanowanyembed={
  

  color : 0xfccb6c, 
  author :{

    name : footer,
    icon_url : iconurl
  },

  
title : `BANNED`,
  description : ` Zostałeś zbanowany przez administratora: ${message.author.tag}, z powodu ${reason}` , 
footer :{
  text: footer + version + dev,
  icon_url: iconurl,
},







};






const zkickowanyemved={
  

  color : 0xfccb6c, 
  author :{

    name : footer,
    icon_url : iconurl
  },

  
title : `KICKED`,
  description : ` Zostałeś wyrzucony przez administratora: ${message.author.tag}, z powodu ${reason}` , 
footer :{
  text: footer +  dev,
  icon_url: iconurl,
},







};






//////////////////////////////////

  
  
  if(command === "kick") {
 
    if(!message.member.roles.cache.some(r=>[configs.adminroles, configs.modroles].includes(r.id)) )
      return message.channel.send({embed : bpermisji });
    let member = message.mentions.members.first();
    if(!member)
      return message.channel.send({embed : ntak})
    if(!member.kickable) 
      return message.reply("Nie moge wyrzucic tego uzytkownika. Potrzebuje permisji.");
    
   
    let reason = args.slice(1).join(' ');
    if(!reason) reason = " - ";


    
    
   
    await member.kick(reason)
      .catch(error => message.reply(`Sorki ${message.author}, Coś zle zrobiles. Kod bledu: ${error}`));
      const kicked ={
        color : 0xfccb6c, 
        author :{
      
          name : footer,
          icon_url : iconurl
        },
      
        
      title : " Uzytkownik zostal pomyslnie **Wyrzucony!** ",
        description : `${member.user.tag} Zostal wyrzucony przez ${message.author.tag}. Powod: ${reason}`, 
      footer :{
        text: footer +  dev,
        icon_url: iconurl,
      },
        };
    
    message.channel.send({embed : kicked});
    member.send({embed: zkickowanyemved})

  }
  
  if(command === "ban") {

    if(!message.member.roles.cache.some(r=>configs.adminroles.includes(r.id)) ) // you have to create this role and give it to the mod
      return message.channel.send({embed : bpermisji });
    
    let member = message.mentions.members.first();
    if(!member)
      return message.channel.send({embed : ntak})
    if(!member.bannable) 
      return message.reply("Brakuje mi permisji.");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = " - ";
    
   await member.ban(reason)
    .catch(error => message.reply(`Ups! ${message.author} Cos poszlo nie tak. Kod bledu: ${error}`));
      const banned ={
        color : 0xfccb6c, 
        author :{
      
          name : footer,
          icon_url : iconurl
        },
      
        
      title : " Uzytkownik zostal **zbanowany!** ",
        description : `${member.user.tag} Zostal zbanowany przez ${message.author.tag}. Powod: ${reason}`, 
      footer :{
        text: footer + dev,
        icon_url: iconurl,
      },
        };
    
    message.reply({embed : banned });
    member.send({embed:zbanowanyembed})
  }

 





	

   

      const ip ={

        color : 0xfccb6c, 
        author :{
    
          name : footer,
          icon_url : iconurl
        },
    
    
        title : "**IP serwera** ",
        description : `connect **ls.projectfive.pl**  `, 
        footer :{
        text: ` ${footer} | IP Serwera  `,
        icon_url: iconurl,
      },


      }
        



        
      if(command === "ip") {
       
          message.channel.send({embed : ip });
      }
        


    












      const acceptsup ={

        color : 0x00ff00, 
        author :{
    
          name : footer,
          icon_url : iconurl
        },
    
    
        title : "Twoje podanie z kategorii Support zostało **PRZYJĘTE!** ",
        description : `Gratulujemy! Prosimy o zgloszenie się do wysokiej rangi, aby przejść rozmowę kwalifikacyjną.  `, 
        footer :{
        text: ` ${message.author.tag}`,
        icon_url: message.author.displayAvatarURL({ format: 'png' }),
      },


      }




      if(command === "akceptujsupport") {
        if(!message.member.roles.cache.some(r => config.adminroles.includes(r.id)) ) // you have to create this role and give it to the mod
        return message.channel.send({embed : bpermisji });
        

        let member = message.mentions.members.first();
        if(!member)
          return message.channel.send({embed : ntak})
     
        member.send({embed : acceptsup });
        message.channel.send("Pomyślnie zaakceptowano")
    }
      


    const odrzucsup ={

      color : 0xff0000, 
      author :{
  
        name : footer,
        icon_url : iconurl
      },
  
  
      title : "Twoje podanie z kategorii Support zostało **ODRZUCONE!** ",
      description : `Bardzo nam przykro. Mamy nadzieję, że następnym razem się uda `, 
      footer :{
      text: ` ${message.author.tag}`,
      icon_url: message.author.displayAvatarURL({ format: 'png' }),
    },


    }

    const odrzucwlc ={

      color : 0xff0000, 
      author :{
    
        name : footer,
        icon_url : iconurl
      },
    
    
      title : "Twoje podanie z kategorii WL-Checker zostało **ODRZUCONE!** ",
      description : `Bardzo nam przykro. Mamy nadzieję, że następnym razem się uda `, 
      footer :{
      text: ` ${message.author.tag}`,
      icon_url: message.author.displayAvatarURL({ format: 'png' }),
    },
    
    
    }


    if(command === "odrzucwlcheck") {
      if(!message.member.roles.cache.some(r=>config.adminroles.includes(r.id)) ) // you have to create this role and give it to the mod
      return message.channel.send({embed : bpermisji });
      

      let member = message.mentions.members.first();
      if(!member)
        return message.channel.send({embed : ntak})
   
      member.send({embed : odrzucwlc });
      message.channel.send("Pomyślnie odrzucono")
  }




  
  const acceptwlc ={

    color : 0x00ff00, 
    author :{

      name : footer,
      icon_url : iconurl
    },


    title : "Twoje podanie z kategorii WL-Checker zostało **PRZYJĘTE!** ",
    description : `Gratulujemy! Prosimy o zgloszenie się do Opiekuna WL-Checkerów, aby przejść rozmowę kwalifikacyjną.  `, 
    footer :{
    text: ` ${message.author.tag}`,
    icon_url: message.author.displayAvatarURL({ format: 'png' }),
  },


  }




  if(command === "akceptujwlcheck") {
    if(!message.member.roles.cache.some(r=>config.adminroles.includes(r.id)) ) // you have to create this role and give it to the mod
    return message.channel.send({embed : bpermisji });
    

    let member = message.mentions.members.first();
    if(!member)
      return message.channel.send({embed : ntak})
 
    member.send({embed : acceptwlc });
    message.channel.send("Pomyślnie zaakceptowano")
}
  







if(command === "odrzucsupport") {
  if(!message.member.roles.cache.some(r=>config.adminroles.includes(r.id)) ) // you have to create this role and give it to the mod
  return message.channel.send({embed : bpermisji });
  

  let member = message.mentions.members.first();
  if(!member)
    return message.channel.send({embed : ntak})

  member.send({embed : odrzucsup });
  message.channel.send("Pomyślnie odrzucono")
}
        })



      
client.login(configs.token);



