const express = require('express');
const Blogs = require('../controllers/blog')
const {  authCheck } = require('../controllers/login');

const route=express.Router();



/**
 * @swagger
 * components:
 *   schemas:
 *      blog:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The blog id
 *         author:
 *           type: string
 *           description: The blog author
 *         title:
 *           type: string
 *           description: The blog title
 *         description:
 *           type: string
 *           description: The blog description
 *         categories:
 *           type: string
 *           description: The blog categories
 *         time:
 *           type: string
 *           description: The blog posted time
 * 
 * tags: 
 *   name: Blogs
 *   description: API that gets all blogs
 * 
 * /blogs:
 *   get:
 *     summary: Return the list of all the blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: The list of all blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/blog'
 */
route.get('/',Blogs.findAll)
/**
 * @swagger
 * components:
 *   schemas:
 *      blog:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The blog id
 *         author:
 *           type: string
 *           description: The blog author
 *         title:
 *           type: string
 *           description: The blog title
 *         description:
 *           type: string
 *           description: The blog description
 *         categories:
 *           type: string
 *           description: The blog categories
 *         time:
 *           type: string
 *           description: The blog posted time
 * 
 * tags: 
 *   name: Blogs
 *   description: API for creating blogs
 * 
 * security:
 *   - BearerAuth: []
 * 
 * /blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The url of the blog to scrape
 *                 example: "https://www.example.com/blog-post"
 *     responses:
 *       200:
 *         description: The created blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/blog'
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: "Content can not be empty!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                   example: failure
 *                 data:
 *                   type: string
 *                   description: The reason for the failure
 *                   example: "Something went wrong. Please try again."
 */ 

route.post('/', authCheck, Blogs.create);
/**
 * @swagger
 * /blogs/tag/{id}:
 *   get:
 *     summary: Get all blogs with the specified tag
 *     tags:
 *       - Blogs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The tag to search for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of blogs with the specified tag
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: 'https://blog-crawler.onrender.com/blogs/'
 *       '400':
 *         description: The specified tag is invalid or no blogs were found with the specified tag
 */

route.get('/tag/:id', Blogs.findByTag)
/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get the Blog by ID
 *     tags:
 *       - Blogs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the blog to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The blog by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: 'https://blog-crawler.onrender.com/blogs/'
 *       '400':
 *         description: The specified blog ID is invalid or not found
 */

route.get('/:id', Blogs.findOne);
/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete the Blog by Id
 *     tags:
 *       - Blogs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the blog to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The blog was successfully deleted
 *       '400':
 *         description: The specified blog ID is invalid or the blog could not be deleted
 */

route.delete('/:id', Blogs.delete);

module.exports=route;