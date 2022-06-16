const { MessageEmbed } = require('discord.js');
const { Octokit } = require('octokit');
require('dotenv').config();

module.exports = {
  callback: async (message) => {
    const octokit = new Octokit({ auth: process.env.GITHUB_API_KEY });

    await octokit.request('GET /orgs/{org}/repos', {
      org: 'Avdan-OS'
    })
    .then((data) => {
      let embed = new MessageEmbed()
        .setTitle('Repository list')
        .setColor('BLUE')

      data.data.forEach(dataChildren => {
        embed.addFields(
          { name: `${dataChildren.name}`, value: `${dataChildren.description}` }
        )
      })
      message.channel.send({ embeds: [embed] });
    });
  }
};