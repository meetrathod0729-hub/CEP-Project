const prisma = require("./config/db");

async function seed() {
  await prisma.hospital.createMany({
    data: [
      {
        name: "KEM Hospital",
        address: "Parel, Mumbai",
        lat: 19.002,
        lng: 72.841,
        totalBeds: 500,
        erCapacity: 100,
        currentPatients: 300,
        availableBeds: 200,
        avgWaitTime: 30,
        contactNumber: "1234567890",
      },
      {
        name: "Lilavati Hospital",
        address: "Bandra, Mumbai",
        lat: 19.060,
        lng: 72.829,
        totalBeds: 300,
        erCapacity: 80,
        currentPatients: 220,
        availableBeds: 80,
        avgWaitTime: 20,
        contactNumber: "9876543210",
      },
      {
        name: "Hinduja Hospital",
        address: "Mahim, Mumbai",
        lat: 19.041,
        lng: 72.839,
        totalBeds: 400,
        erCapacity: 90,
        currentPatients: 250,
        availableBeds: 150,
        avgWaitTime: 25,
        contactNumber: "9999999999",
      },
    ],
  });

  console.log(" Hospitals inserted");
}

seed()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());