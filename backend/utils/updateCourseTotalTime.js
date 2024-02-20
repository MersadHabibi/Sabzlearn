import { PrismaClient } from "@prisma/client";
import e from "cors";
const prisma = new PrismaClient();

async function updateTotalTime(courseId) {
  console.log(courseId);
  return new Promise(async (resolve, reject) => {
    // prisma.course.findMany().then((courses) => {
    //   const finded = courses.find((course) => {
    //     return course.id == courseId;
    //   });
    //   console.log(finded);
    // });

    prisma.course
      .findUnique({
        where: { id: courseId },
        include: {
          subjects: {
            select: {
              episodes: true,
            },
          },
        },
      })
      .then(async (course) => {
        console.log(course.subjects);
        const totalTime = await course?.subjects.map((subjectEpisodes) => {
          return subjectEpisodes.episodes.reduce(
            (acc, episode) => +acc + +episode.time,
            0
          );
        });

        // ?.episodes?.reduce(
        //   (acc, episode) => +acc + +episode.time,
        //   0
        // );
        let hour = 0,
          minute = 0,
          second = 0;
        if (totalTime[0] >= 3600) {
          hour = Math.floor(totalTime[0] / 3600);
          minute = Math.floor((totalTime[0] - hour * 3600) / 60);
          second = Math.floor(totalTime[0] - hour * 3600 - minute * 60);
        } else if (totalTime[0] > 60) {
          minute = Math.floor(totalTime[0] / 60);
          second = Math.floor(totalTime[0] % 60);
        } else {
          second = totalTime[0];
        }
        console.log(totalTime[0]);
        minute <= 10 ? minute : (minute = `0${minute}`);
        second <= 10 ? second : (second = `0${second}`);
        prisma.course
          .update({
            where: { id: courseId },
            data: {
              time: totalTime[0],
              timeForShow: `${minute}:${second}`,
            },
          })
          .then((result) => {
            console.log(result);
            return resolve("totalTime of course updated successfuly.");
          })
          .catch((err) => {
            console.log(err);
            return reject("error in updating course time", err);
          });
      })
      .catch((err) => {
        console.log(err);
        return reject("error in find course", err);
      });
    // prisma.course
    //   .findFirst({
    //     where: { id: courseId },
    //     include: {
    //       subjects: {
    //         include: {
    //           episodes: true,
    //         },
    //       },
    //     },
    //   })
    //   .then(async (course) => {
    //     const totalTime = await course.subjects.episodes.reduce(
    //       (acc, episode) => acc + episode.time,
    //       0
    //     );
    //     prisma.course
    //       .update({
    //         where: { id: courseId },
    //         data: { time: totalTime },
    //       })
    //       .then((result) => {
    //         return resolve("totalTime of course updated successfuly.");
    //       })
    //       .catch((err) => {
    //         return reject("error in updating course time", err);
    //       });
    //   })
    //   .catch((err) => {
    //     return reject("error in find course", err);
    //   });
  });
}

export default updateTotalTime;
