describe("Bike Event Model", function () {
  var bikeEvent;

  beforeEach(function(){
    bikeEvent = new BikeCheck.Models.BikeEvent({ "latLng": { "jb": 38.91093809928134, "kb": -76.98394775390625 } });
  });

  it("should be defined", function(){
    expect(bikeEvent).to.not.equal(undefined);
  });

  it("should have a latLng", function(){
    expect(bikeEvent.get('latLng')).to.not.equal(undefined);
  });

  it("should have latLng with lat and lng keys", function(){
    expect(bikeEvent.get('latLng')).to.have.property('jb');
    expect(bikeEvent.get('latLng')).to.have.property('kb');    
  });
});