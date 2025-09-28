const Listing = require('../models/listing.js')
//Index route
module.exports.index = async (req, res) => {
  let listings = await Listing.find({});
  res.render("./listings/index.ejs", { listings });
}

//filter route
module.exports.filter = async (req, res) => {
  const category = req.query.category;
  if (!category) {
    return res.redirect('/listings');
  }

  try {
    if (category === 'Home') {
      const listings = await Listing.find({});
      return res.render('listings/index.ejs', { listings });
    }

    const listings = await Listing.find({ category : category });
    res.render('listings/index.ejs', { listings });
  } catch (err) {
    console.error('Error while filtering listings:', err);
    res.status(500).send('Server error');
  }
};


module.exports.renderNewForm = (req, res) => {
  // console.log(req.user);
  res.render("./listings/newlisting.ejs");
}

//New route
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate({path:"reviews",populate: {path:"author"}}).populate("owner");
  if(!listing) {
    req.flash("error","Listing doesn't exist")
    res.redirect("/listings")
  }

  res.render("./listings/show.ejs", { listing });
}

//Create route
module.exports.createListing = async (req, res) => {
  let { title, description, price, location, country,category } = req.body;
  let newlisting = new Listing({
    title: title,
    description: description,
    image: { url: req.file.path,filename:req.file.filename },
    price: price,
    location: location,
    country: country,
    category: category,
  });
  newlisting.owner = req.user._id;
  await newlisting.save();
  req.flash("success","New Listing Created!")
  res.redirect("/listings");
}

//Edit route
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let originalImgUrl = listing.image.url;
  originalImgUrl = originalImgUrl.replace("/upload","/upload/h_300,w_250");
  res.render("./listings/edit.ejs", { listing,originalImgUrl });
}

//Update route
module.exports.updateListing = async (req,res)=>{
  let { title, description, image, price, location, country } = req.body;
  let updatedListing ={
    title: title,
    description: description,
    price: price,
    location: location,
    country: country,
    category:category,
  };
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id,updatedListing);
  if(typeof req.file !== "undefined"){
  listing.image = {url: req.file.path,filename:req.file.filename};
  await listing.save();
  }
    req.flash("success","Listing Updated!")
  res.redirect(`/listings/${id}`);
}


//Delete route
module.exports.destroyListing = async (req,res)=>{
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!")
  res.redirect('/listings')
}



