const contentfulClient = require("../contentfulClient");

function parseDate(dateString) {
   const date = new Date(dateString);

   // Extract year, month, and day
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
   const day = String(date.getDate()).padStart(2, "0");

   return { year, month, day };
}

const getSlideshow = async (req, res) => {
   try {
      const entries = await contentfulClient.getEntries({
         content_type: "mediaForSlideshow",
      });

      let dataForSlideshow = [];
      // console.log(entries.items.length);
      for (let i = 0; i < entries.items.length; i++) {
         const link = entries.items[i].fields.isItAVideo
            ? entries.items[i].fields.youtubeUrl.content[0].content[0].value
            : entries.items[i].fields.media.fields.file.url;

         dataForSlideshow.push({
            id: entries.items[i].sys.id,
            isVideo: entries.items[i].fields.isItAVideo,
            entryName: entries.items[i].fields.entryName,
            url: link,
         });
      }

      res.json(dataForSlideshow);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch data from contentful" });
   }
};

const getAnnouncements = async (req, res) => {
   const { content_type } = req.params;
   const entries = await contentfulClient.getEntries({
      content_type: content_type,
   });

   let dataForNews = [];

   for (let i = 0; i < entries.items.length; i++) {
      let dateAnnouncement = parseDate(entries.items[i].fields.dateOfEvent);
      let dateCreated = parseDate(entries.items[i].sys.createdAt);

      dataForNews.push({
         id: entries.items[i].sys.id,
         title: entries.items[i].fields.title,
         body: entries.items[i].fields.newsBody,
         announcementDate: dateAnnouncement,
         createdDate: dateCreated,
      });
   }
   res.json(dataForNews);
};

const getSingleAnnouncement = async (req, res) => {
   try {
      const { id } = req.params;
      const entry = await contentfulClient.getEntry(id);
      let dateAnnouncement = parseDate(entry.fields.dateOfEvent);
      let dataForNews = {
         id: entry.sys.id,
         title: entry.fields.title,
         body: entry.fields.newsBody,
         announcementDate: entry.fields.dateOfEvent,
      };

      res.json(dataForNews);
   } catch (err) {
      console.log(err);
   }
};

const getAllSermonAnnouncement = async (req, res) => {
   try {
      let sermonData = [];
      const { content_type } = req.params;
      const entries = await contentfulClient.getEntries({
         content_type: content_type,
      });

      for (let i = 0; i < entries.items.length; i++) {
         let dateObject = parseDate(entries.items[i].sys.createdAt);
         sermonData.push({
            id: entries.items[i].sys.id,
            title: entries.items[i].fields.title,
            video: entries.items[i].fields.videoUrl || "n/a",
            description: entries.items[i].fields.description || "n/a",
            isVideo: entries.items[i].fields.isVideo,
            createdDate: dateObject,
         });
      }
      res.json(sermonData);
   } catch (err) {
      console.log(err);
   }
};

const getSingleSermon = async (req, res) => {
   try {
      const { id } = req.params;
      const entry = await contentfulClient.getEntry(id);
      console.log(entry.fields.title);
      let dateObject = parseDate(entry.sys.createdAt);
      let sermonData = {
         id: entry.sys.id,
         title: entry.fields.title,
         video: entry.fields.videoUrl || "n/a",
         description: entry.fields.description || "n/a",
         isVideo: entry.fields.isVideo,
         createdDate: dateObject,
      };
      res.json(sermonData);
   } catch (err) {
      console.log(err);
   }
};

const getRecentPosts = async (req, res) => {
   try {
      let newestPostData = [];
      const entries = await contentfulClient.getEntries({
         select: "sys.id, sys.createdAt, sys.contentType, fields",
         "sys.contentType.sys.id[nin]": "mediaForSlideshow",
         order: "-sys.createdAt",
         limit: 5,
      });

      newestPostData = entries;
      // console.log(newestPostData);
      res.send(entries);
   } catch (err) {
      console.log(err);
   }
};

module.exports = {
   getSlideshow,
   getAnnouncements,
   getSingleAnnouncement,
   getAllSermonAnnouncement,
   getSingleSermon,
   getRecentPosts,
};
