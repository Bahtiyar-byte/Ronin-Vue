'use strict';
const db = require('../models');
const Trades = db.trades;
const TradesData = [
  {
    name: 'Aluminum/Flashing',
  },
  {
    name: 'Box Gutters',
  },
  {
    name: 'Chimney Cap',
  },
  {
    name: 'Downspouts',
  },
  {
    name: 'EPDM',
  },
  {
    name: 'Flat Roof',
  },
  {
    name: 'Gutter Cleaning',
  },
  {
    name: 'Gutter Guards',
  },
  {
    name: 'Gutters',
  },
  {
    name: 'Metal',
  },
  {
    name: 'Pressure Washing',
  },
  {
    name: 'Service Repairs',
  },
  {
    name: 'Service: Call Back',
  },
  {
    name: 'Shingles',
  },
  {
    name: 'Siding',
  },
  {
    name: 'Silicone',
  },
  {
    name: 'Sky light',
  },
  {
    name: 'Slate',
  },
  {
    name: 'Soffit/ Fascia',
  },
  {
    name: 'Tile',
  },
  {
    name: 'TPO',
  },
  {
    name: 'Vent install',
  },
  {
    name: 'Ventilation',
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    // await Trades.bulkCreate(TradesData);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
