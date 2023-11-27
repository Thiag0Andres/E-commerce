import { Joi } from 'celebrate';

class Schemas {
  // Users
  authenticateUserSchema = {
    body: Joi.object().keys({
      email: Joi
        .string()
        .email()
        .required()
        .messages({
          'string.base': `"Email" should be a type of string`,
          'string.empty': `"Email" can't be empty`,
          'string.email': `"Email" isn't an valid email`,
          'any.required': `"Email" is required`,
        }),
      password: Joi
        .string()
        .min(6)
        .required()
        .messages({
          'string.base': `"Password" should be a type of string`,
          'string.empty': `"Password" can't be empty`,
          'string.min': `"Password" must have at least 6 digits`,
          'any.required': `"Password" is required`,
        }),
    }),
  };

  createUserSchema = {
    body: Joi.object().keys({
      first_name: Joi
        .string()
        .required()
        .messages({
          'string.base': `"First name" should be a type of string`,
          'string.empty': `"First name" can't be empty`,
          'any.required': `"First name" is required`,
        }),
      last_name: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Last name" should be a type of string`,
          'string.empty': `"Last name" can't be empty`,
          'any.required': `"Last name" is required`,
        }),
      display_name: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Display name" should be a type of string`,
          'string.empty': `"Display name" can't be empty`,
          'any.required': `"Display name" is required`,
        }),
      username: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Username" should be a type of string`,
          'string.empty': `"Username" can't be empty`,
          'any.required': `"Username" is required`,
        }),
      emails: Joi
        .array()
        .items(Joi
            .string()
            .email()
            .required()
            .messages({
              'string.base': `"Email" should be a type of string`,
              'string.empty': `"Email" can't be empty`,
              'string.email': `"Email" isn't an valid email`,
              'any.required': `"Email" is required`,
            }))
        .unique()
        .required()
        .messages({
              'array.base': `Emails should be a type of array`,
              'array.empty': `Emails can't be empty`,
              'array.unique': `Emails are an unique field`,
              'any.required': `Emails are required`
          }),
      defaultEmail: Joi
          .string()
          .email()
          .required()
          .messages({
              'string.base': `"Email" should be a type of string`,
              'string.empty': `"Email" can't be empty`,
              'string.email': `"Email" isn't an valid email`,
              'any.required': `"Email" is required`,
          }),
      password: Joi
          .string()
          .min(6)
          .required()
          .messages({
              'string.base': `"Password" should be a type of string`,
              'string.empty': `"Password" can't be empty`,
              'string.min': `"Password" must have at least 6 digits`,
              'any.required': `"Password" is required`,
          }),
      image_url: Joi
        .string()
        .uri()
        .messages({
          'string.base': `"Image url" should be a type of string`,
          'string.empty': `"Image url" can't be empty`,
          'string.uri': `"Image url" is not a valid url`,
        }),
      user_type: Joi
          .string()
          .required()
          .messages({
              'string.base': `"User type" should be a type of string`,
              'string.empty': `"User type" can't be empty`,
              'any.required': `"User type" is required`,
          }),
    }),
  };

  addEmailUserSchema = {
    body: Joi.object().keys({
      email: Joi
        .string()
        .email()
        .required()
        .messages({
          'string.base': `"Email" should be a type of string`,
          'string.empty': `"Email" can't be empty`,
          'string.email': `"Email" isn't an valid email`,
          'any.required': `"Email" is required`,
        })
    }),
  };

  confirmEmailUserSchema = {
    body: Joi.object().keys({
      email: Joi
        .string()
        .email()
        .required()
        .messages({
          'string.base': `"Email" should be a type of string`,
          'string.empty': `"Email" can't be empty`,
          'string.email': `"Email" isn't an valid email`,
          'any.required': `"Email" is required`,
        }),
      token: Joi
        .number()
        .required()
        .messages({
          'number.base': `"Token" should be a type of number`,
          'number.empty': `"Token" can't be empty`,
          'any.required': `"Token" is required`,
        })
    }),
  };

  updateUserSchema = {
    body: Joi.object().keys({
      id: Joi.number(),
      first_name: Joi
        .string()
        .messages({
          'string.base': `"First name" should be a type of string`,
          'string.empty': `"First name" can't be empty`,
        }),
      last_name: Joi
        .string()
        .messages({
          'string.base': `"Last name" should be a type of string`,
          'string.empty': `"Last name" can't be empty`,
        }),
      display_name: Joi
        .string()
        .messages({
          'string.base': `"Display name" should be a type of string`,
          'string.empty': `"Display name" can't be empty`,
        }),
      username: Joi
        .string()
        .messages({
          'string.base': `"Username" should be a type of string`,
          'string.empty': `"Username" can't be empty`,
        }),
      emails: Joi
        .array()
        .items(Joi
          .string()
          .email()
          .messages({
            'string.base': `"Email" should be a type of string`,
            'string.empty': `"Email" can't be empty`,
            'string.email': `"Email" isn't an valid email`,
          }))
        .unique()
        .messages({
            'array.base': `Emails should be a type of array`,
            'array.empty': `Emails can't be empty`,
            'array.unique': `Emails are an unique field`,
          }),
      defaultEmail: Joi
        .string()
        .email()
        .messages({
          'string.base': `"Email" should be a type of string`,
          'string.empty': `"Email" can't be empty`,
          'string.email': `"Email" isn't an valid email`,
        }),
      password: Joi
        .string()
        .min(6)
        .messages({
          'string.base': `"Password" should be a type of string`,
          'string.empty': `"Password" can't be empty`,
          'string.min': `"Password" must have at least 6 digits`,
        }),
      bio: Joi
        .string()
        .messages({
          'string.base': `"Bio" should be a type of string`,
          'string.empty': `"Bio" can't be empty`
        }),
      image_url: Joi
        .string()
        .uri()
        .messages({
          'string.base': `"Image url" should be a type of string`,
          'string.empty': `"Image url" can't be empty`,
          'string.uri': `"Image url" is not a valid url`,
        }),
      phone_number: Joi
        .string()
        .allow('')
        .messages({
          'string.base': `"Phone number" should be a type of string`,
          'string.empty': `"Phone number" can't be empty`
        }),
      user_type: Joi
        .string()
        .messages({
          'string.base': `"User type" should be a type of string`,
          'string.empty': `"User type" can't be empty`
        }),
      location_lat: Joi
        .number()
        .messages({
          'number.base': `"Latitude" should be a type of number`,
          'number.empty': `"Latitude" can't be empty`,
        }),
      location_lon:  Joi
        .number()
        .messages({
          'number.base': `"Longitude" should be a type of number`,
          'number.empty': `"Longitude" can't be empty`,
        }),
      preferences_id: Joi
        .array()
        .items(Joi
          .number()
          .messages({
            'number.base': `"Preference ID" should be a type of number`,
            'number.empty': `"Preference ID" can't be empty`,
          }))
        .unique()
        .messages({
            'array.base': `Preferences ID should be a type of array`,
            'array.empty': `Preferences ID can't be empty`,
            'array.unique': `Preferences ID are an unique field`,
          }),
      kitchen_ids: Joi
        .array()
        .items(Joi
          .number()
          .messages({
            'number.base': `"Kitchen ID" should be a type of number`,
            'number.empty': `"Kitchen ID" can't be empty`,
          }))
        .unique()
        .messages({
            'array.base': `Kitchens ID should be a type of array`,
            'array.empty': `Kitchens ID can't be empty`,
            'array.unique': `Kitchens ID are an unique field`,
          }),
      followers_ids: Joi
        .array()
        .items(Joi
          .number()
          .messages({
            'number.base': `"Follower ID" should be a type of number`,
            'number.empty': `"Follower ID" can't be empty`,
          }))
        .unique()
        .messages({
            'array.base': `Followers ID should be a type of array`,
            'array.empty': `Followers ID can't be empty`,
            'array.unique': `Followers ID are an unique field`,
          }),
      following_ids: Joi
        .array()
        .items(Joi
          .number()
          .messages({
            'number.base': `"Following ID" should be a type of number`,
            'number.empty': `"Following ID" can't be empty`,
          }))
        .unique()
        .messages({
            'array.base': `Followings ID should be a type of array`,
            'array.empty': `Followings ID can't be empty`,
            'array.unique': `Followings ID are an unique field`,
          }),
      reviews_ids: Joi
        .array()
        .items(Joi
          .number()
          .messages({
            'number.base': `"Review ID" should be a type of number`,
            'number.empty': `"Review ID" can't be empty`,
          }))
        .unique()
        .messages({
            'array.base': `Reviews ID should be a type of array`,
            'array.empty': `Reviews ID can't be empty`,
            'array.unique': `Reviews ID are an unique field`,
          }),
      is_email_verified: Joi
        .boolean()
        .messages({
          'boolean.base': `"Is email verified" should be a type of boolean`,
          'boolean.empty': `"Is email verified" can't be empty`
        }),
      verification_email_token: Joi
        .number()
        .messages({
          'number.base': `"Email verification token" should be a type of number`,
          'number.empty': `"Email verification token" can't be empty`
        }),
      created_at: Joi.string(),
      updated_at: Joi.string()
    }),
  };

  // Action
  createActionSchema = {
    body: Joi.object().keys({
      action: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Action" should be a type of string`,
          'string.empty': `"Action" can't be empty`,
          'any.required': `"Action" is required`,
        })
    }),
  };

  updateActionSchema = {
    body: Joi.object().keys({
      id: Joi.number(),
      action: Joi
        .string()
        .messages({
          'string.base': `"Action" should be a type of string`,
          'string.empty': `"Action" can't be empty`
        }),
      created_at: Joi.string(),
      updated_at: Joi.string()
    }),
  };

  // Category
  createCategorySchema = {
    body: Joi.object().keys({
      title: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Title" should be a type of string`,
          'string.empty': `"Title" can't be empty`,
          'any.required': `"Title" is required`,
        }),
      description: Joi
        .string()
        .allow('')
        .required()
        .messages({
          'string.base': `"Description" should be a type of string`,
          'string.empty': `"Description" can't be empty`,
          'any.required': `"Description" is required`,
        })
    }),
  };

  updateCategorySchema = {
    body: Joi.object().keys({
      id: Joi.number(),
      title: Joi
        .string()
        .messages({
          'string.base': `"Title" should be a type of string`,
          'string.empty': `"Title" can't be empty`
        }),
      description: Joi
        .string()
        .allow('')
        .messages({
          'string.base': `"Description" should be a type of string`,
          'string.empty': `"Description" can't be empty`
        }),
      created_at: Joi.string(),
      updated_at: Joi.string()
    }),
  };

  // Newsletter
  createNewsletterSchema = {
    body: Joi.object().keys({
      user_id: Joi
        .number()
        .required()
        .messages({
          'number.base': `"User ID" should be a type of number`,
          'number.empty': `"User ID" can't be empty`,
          'any.required': `"User ID" is required`,
        }),
      frequence: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Frequence" should be a type of string`,
          'string.empty': `"Frequence" can't be empty`,
          'any.required': `"Frequence" is required`,
        }),
      admin: Joi
        .boolean()
        .required()
        .messages({
          'boolean.base': `"Admin" should be a type of boolean`,
          'boolean.empty': `"Admin" can't be empty`,
          'any.required': `"Admin" is required`,
        }),
      actions_ids: Joi
        .array()
        .items(Joi
          .number()
          .messages({
            'number.base': `"Action ID" should be a type of number`,
            'number.empty': `"Action ID" can't be empty`,
          }))
        .unique()
        .messages({
          'array.base': `Actions ID should be a type of array`,
          'array.empty': `Actions ID can't be empty`,
          'array.unique': `Actions ID are an unique field`,
        }),
    }),
  };

  updateNewsletterSchema = {
    body: Joi.object().keys({
      id: Joi.number(),
      user_id: Joi
        .number()
        .messages({
          'number.base': `"User ID" should be a type of number`,
          'number.empty': `"User ID" can't be empty`,
        }),
      frequence: Joi
        .string()
        .messages({
          'string.base': `"Frequence" should be a type of string`,
          'string.empty': `"Frequence" can't be empty`,
        }),
      admin: Joi
        .boolean()
        .messages({
          'boolean.base': `"Admin" should be a type of boolean`,
          'boolean.empty': `"Admin" can't be empty`,
        }),
      actions_ids: Joi
        .array()
        .items(Joi
          .number()
          .messages({
            'number.base': `"Action ID" should be a type of number`,
            'number.empty': `"Action ID" can't be empty`,
          }))
        .unique()
        .messages({
          'array.base': `Actions ID should be a type of array`,
          'array.empty': `Actions ID can't be empty`,
          'array.unique': `Actions ID are an unique field`,
        }),
      created_at: Joi.string(),
      updated_at: Joi.string()
    }),
  };

  // Preferences
  createPreferencesSchema = {
    body: Joi.object().keys({
      user_id: Joi
        .number()
        .required()
        .messages({
          'number.base': `"User ID" should be a type of number`,
          'number.empty': `"User ID" can't be empty`,
          'any.required': `"User ID" is required`,
        }),
      first_name: Joi
        .string()
        .required()
        .messages({
          'string.base': `"First name" should be a type of string`,
          'string.empty': `"First name" can't be empty`,
          'any.required': `"First name" is required`,
        }),
      last_name: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Last name" should be a type of string`,
          'string.empty': `"Last name" can't be empty`,
          'any.required': `"Last name" is required`,
        }),
      birth_date: Joi
        .date()
        .required()
        .messages({
          'date.base': `"Birth date" should be a type of date`,
          'date.empty': `"Birth date" can't be empty`,
          'any.required': `"Birth date" is required`,
        }),
      address_zipcode: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Zipcode" should be a type of string`,
          'string.empty': `"Zipcode" can't be empty`,
          'any.required': `"Zipcode" is required`,
        }),
      address_country: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Country" should be a type of string`,
          'string.empty': `"Country" can't be empty`,
          'any.required': `"Country" is required`,
        }),
      address_city: Joi
        .string()
        .required()
        .messages({
          'string.base': `"City" should be a type of string`,
          'string.empty': `"City" can't be empty`,
          'any.required': `"City" is required`,
        }),
      address_street: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Street" should be a type of string`,
          'string.empty': `"Street" can't be empty`,
          'any.required': `"Street" is required`,
        }),
      phone_number: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Phone number" should be a type of string`,
          'string.empty': `"Phone number" can't be empty`,
          'any.required': `"Phone number" is required`,
        }),
      iban: Joi
        .string()
        .required()
        .messages({
          'string.base': `"IBAN" should be a type of string`,
          'string.empty': `"IBAN" can't be empty`,
          'any.required': `"IBAN" is required`,
        }),
    }),
  };

  updatePreferencesSchema = {
    body: Joi.object().keys({
      id: Joi.number(),
      user_id: Joi
        .number()
        .messages({
          'number.base': `"User ID" should be a type of number`,
          'number.empty': `"User ID" can't be empty`,
        }),
      first_name: Joi
        .string()
        .messages({
          'string.base': `"First name" should be a type of string`,
          'string.empty': `"First name" can't be empty`,
        }),
      last_name: Joi
        .string()
        .messages({
          'string.base': `"Last name" should be a type of string`,
          'string.empty': `"Last name" can't be empty`,
        }),
      birth_date: Joi
        .date()
        .messages({
          'date.base': `"Birth date" should be a type of date`,
          'date.empty': `"Birth date" can't be empty`,
        }),
      address_zipcode: Joi
        .string()
        .messages({
          'string.base': `"Zipcode" should be a type of string`,
          'string.empty': `"Zipcode" can't be empty`,
        }),
      address_country: Joi
        .string()
        .messages({
          'string.base': `"Country" should be a type of string`,
          'string.empty': `"Country" can't be empty`,
        }),
      address_city: Joi
        .string()
        .messages({
          'string.base': `"City" should be a type of string`,
          'string.empty': `"City" can't be empty`,
        }),
      address_street: Joi
        .string()
        .messages({
          'string.base': `"Street" should be a type of string`,
          'string.empty': `"Street" can't be empty`,
        }),
      phone_number: Joi
        .string()
        .messages({
          'string.base': `"Phone number" should be a type of string`,
          'string.empty': `"Phone number" can't be empty`,
        }),
      iban: Joi
        .string()
        .messages({
          'string.base': `"IBAN" should be a type of string`,
          'string.empty': `"IBAN" can't be empty`,
        }),
      created_at: Joi.string(),
      updated_at: Joi.string()
    }),
  };

  // Inbox
  createInboxSchema = {
    body: Joi.object().keys({
      user_id: Joi
        .number()
        .required()
        .messages({
          'number.base': `"User ID" should be a type of number`,
          'number.empty': `"User ID" can't be empty`,
          'any.required': `"User ID" is required`,
        }),
      sender_id: Joi
        .number()
        .required()
        .messages({
          'number.base': `"Sender ID" should be a type of number`,
          'number.empty': `"Sender ID" can't be empty`,
          'any.required': `"Sender ID" is required`,
        }),
      message: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Message" should be a type of string`,
          'string.empty': `"Message" can't be empty`,
          'any.required': `"Message" is required`,
        }),
      typeMessage: Joi
        .string()
        .required()
        .messages({
          'string.base': `"TypeMessage" should be a type of string`,
          'string.empty': `"TypeMessage" can't be empty`,
          'any.required': `"TypeMessage" is required`,
        }),
      isReview: Joi
        .boolean()
        .required()
        .messages({
          'boolean.base': `"IsReview" should be a type of boolean`,
          'boolean.empty': `"IsReview" can't be empty`,
          'any.required': `"IsReview" is required`,
        }),
    }),
  };

  contactUsInboxSchema = {
    body: Joi.object().keys({
      sender_id: Joi
        .number()
        .messages({
          'number.base': `"Sender ID" should be a type of number`,
          'number.empty': `"Sender ID" can't be empty`
        }),
      email: Joi
        .string()
        .email()
        .messages({
          'string.base': `"Email" should be a type of string`,
          'string.empty': `"Email" can't be empty`,
          'string.email': `"Email" isn't an valid email`,
        }),
      message: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Message" should be a type of string`,
          'string.empty': `"Message" can't be empty`,
          'any.required': `"Message" is required`,
        }),
      typeMessage: Joi
        .string()
        .required()
        .messages({
          'string.base': `"TypeMessage" should be a type of string`,
          'string.empty': `"TypeMessage" can't be empty`,
          'any.required': `"TypeMessage" is required`,
        }),
    }),
  };

  updateInboxSchema = {
    body: Joi.object().keys({
      id: Joi.number(),
      user_id: Joi
        .number()
        .messages({
          'number.base': `"User ID" should be a type of number`,
          'number.empty': `"User ID" can't be empty`,
        }),
      sender_id: Joi
        .number()
        .messages({
          'number.base': `"Sender ID" should be a type of number`,
          'number.empty': `"Sender ID" can't be empty`,
        }),
      message: Joi
        .string()
        .messages({
          'string.base': `"Message" should be a type of string`,
          'string.empty': `"Message" can't be empty`,
        }),
      typeMessage: Joi
        .string()
        .messages({
          'string.base': `"TypeMessage" should be a type of string`,
          'string.empty': `"TypeMessage" can't be empty`,
        }),
      isReview: Joi
        .boolean()
        .messages({
          'boolean.base': `"IsReview" should be a type of boolean`,
          'boolean.empty': `"IsReview" can't be empty`,
        }),
      created_at: Joi.string(),
      updated_at: Joi.string()
    }),
  };

  // Kitchen
  createKitchenSchema = {
    body: Joi.object().keys({
      user_id: Joi
        .number()
        .required()
        .messages({
          'number.base': `"User ID" should be a type of number`,
          'number.empty': `"User ID" can't be empty`,
          'any.required': `"User ID" is required`,
        }),
      name: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Name" should be a type of string`,
          'string.empty': `"Name" can't be empty`,
          'any.required': `"Name" is required`,
        }),
      description: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Description" should be a type of string`,
          'string.empty': `"Description" can't be empty`,
          'any.required': `"Description" is required`,
        }),
      image_urls: Joi
        .array()
        .items(Joi
          .string()
          .messages({
            'string.base': `"Image URL" should be a type of string`,
            'string.empty': `"Image URL" can't be empty`,
          }))
        .unique()
        .messages({
          'array.base': `Images URLs should be a type of array`,
          'array.empty': `Images URLs can't be empty`,
          'array.unique': `Images URLs are an unique field`,
        }),
      price_per_time: Joi
        .number()
        .required()
        .messages({
          'number.base': `"Price" should be a type of number`,
          'number.empty': `"Price" can't be empty`,
          'any.required': `"Price" is required`,
        }),
      time_type: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Time type" should be a type of string`,
          'string.empty': `"Time type" can't be empty`,
          'any.required': `"Time type" is required`,
        }),
      category_id: Joi
        .number()
        .required()
        .messages({
          'number.base': `"Category ID" should be a type of number`,
          'number.empty': `"Category ID" can't be empty`,
          'any.required': `"Category ID" is required`,
        }),
      expireDate: Joi
        .date()
        .required()
        .messages({
          'date.base': `"Expire date" should be a type of date`,
          'date.empty': `"Expire date" can't be empty`,
          'any.required': `"Expire date" is required`,
        }),
      status: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Status" should be a type of string`,
          'string.empty': `"Status" can't be empty`,
          'any.required': `"Status" is required`,
        }),
      likes: Joi
        .number()
        .required()
        .messages({
          'number.base': `"Likes" should be a type of number`,
          'number.empty': `"Likes" can't be empty`,
          'any.required': `"Likes" is required`,
        }),
      location_lat: Joi
        .number()
        .required()
        .messages({
          'number.base': `"Latitude" should be a type of number`,
          'number.empty': `"Latitude" can't be empty`,
          'any.required': `"Latitude" is required`,
        }),
      location_lon: Joi
        .number()
        .required()
        .messages({
          'number.base': `"Longitude" should be a type of number`,
          'number.empty': `"Longitude" can't be empty`,
          'any.required': `"Longitude" is required`,
        }),
    }),
  };

  updateKitchenSchema = {
    body: Joi.object().keys({
      id: Joi.number(),
      user_id: Joi
        .number()
        .messages({
          'number.base': `"User ID" should be a type of number`,
          'number.empty': `"User ID" can't be empty`,
        }),
      name: Joi
        .string()
        .messages({
          'string.base': `"Name" should be a type of string`,
          'string.empty': `"Name" can't be empty`,
        }),
      description: Joi
        .string()
        .messages({
          'string.base': `"Description" should be a type of string`,
          'string.empty': `"Description" can't be empty`,
        }),
      image_urls: Joi
        .array()
        .items(Joi
          .string()
          .messages({
            'string.base': `"Image URL" should be a type of string`,
            'string.empty': `"Image URL" can't be empty`,
          }))
        .unique()
        .messages({
          'array.base': `Images URLs should be a type of array`,
          'array.empty': `Images URLs can't be empty`,
          'array.unique': `Images URLs are an unique field`,
        }),
      price_per_time: Joi
        .number()
        .messages({
          'number.base': `"Price" should be a type of number`,
          'number.empty': `"Price" can't be empty`,
        }),
      time_type: Joi
        .string()
        .messages({
          'string.base': `"Time type" should be a type of string`,
          'string.empty': `"Time type" can't be empty`,
        }),
      category_id: Joi
        .number()
        .messages({
          'number.base': `"Category ID" should be a type of number`,
          'number.empty': `"Category ID" can't be empty`,
        }),
      expireDate: Joi
        .date()
        .messages({
          'date.base': `"Expire date" should be a type of date`,
          'date.empty': `"Expire date" can't be empty`,
        }),
      status: Joi
        .string()
        .messages({
          'string.base': `"Status" should be a type of string`,
          'string.empty': `"Status" can't be empty`,
        }),
      likes: Joi
        .number()
        .messages({
          'number.base': `"Likes" should be a type of number`,
          'number.empty': `"Likes" can't be empty`,
        }),
      location_lat: Joi
        .number()
        .messages({
          'number.base': `"Latitude" should be a type of number`,
          'number.empty': `"Latitude" can't be empty`,
        }),
      location_lon: Joi
        .number()
        .messages({
          'number.base': `"Longitude" should be a type of number`,
          'number.empty': `"Longitude" can't be empty`,
        }),
      created_at: Joi.string(),
      updated_at: Joi.string()
    }),
  };

  // Transaction
  createTransactionSchema = {
    body: Joi.object().keys({
      kitchen_id: Joi
        .number()
        .required()
        .messages({
          'number.base': `"Kitchen ID" should be a type of number`,
          'number.empty': `"Kitchen ID" can't be empty`,
          'any.required': `"Kitchen ID" is required`,
        }),
      status: Joi
        .string()
        .required()
        .messages({
          'string.base': `"Status" should be a type of string`,
          'string.empty': `"Status" can't be empty`,
          'any.required': `"Status" is required`,
        }),
      sum: Joi
        .number()
        .required()
        .messages({
          'number.base': `"Sum" should be a type of number`,
          'number.empty': `"Sum" can't be empty`,
          'any.required': `"Sum" is required`,
        }),
      starter_id: Joi
        .number()
        .required()
        .messages({
          'number.base': `"Starter ID" should be a type of number`,
          'number.empty': `"Starter ID" can't be empty`,
          'any.required': `"Starter ID" is required`,
        }),
      seller_id: Joi
        .number()
        .required()
        .messages({
          'number.base': `"Seller ID" should be a type of number`,
          'number.empty': `"Seller ID" can't be empty`,
          'any.required': `"Seller ID" is required`,
        }),
    }),
  };

  updateTransactionSchema = {
    body: Joi.object().keys({
      id: Joi.number(),
      kitchen_id: Joi
        .number()
        .messages({
          'number.base': `"Kitchen ID" should be a type of number`,
          'number.empty': `"Kitchen ID" can't be empty`,
        }),
      status: Joi
        .string()
        .messages({
          'string.base': `"Status" should be a type of string`,
          'string.empty': `"Status" can't be empty`,
        }),
      sum: Joi
        .number()
        .messages({
          'number.base': `"Sum" should be a type of number`,
          'number.empty': `"Sum" can't be empty`,
        }),
      starter_id: Joi
        .number()
        .messages({
          'number.base': `"Starter ID" should be a type of number`,
          'number.empty': `"Starter ID" can't be empty`,
        }),
      seller_id: Joi
        .number()
        .messages({
          'number.base': `"Seller ID" should be a type of number`,
          'number.empty': `"Seller ID" can't be empty`,
        }),
      created_at: Joi.string(),
      updated_at: Joi.string()
    }),
  };
}

export default new Schemas;