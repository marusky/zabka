class LevelsController < ApplicationController
  before_action :set_level, only: %i[ show edit update destroy ]

  # GET /levels or /levels.json
  def index
    @levels = Level.all
  end

  # GET /levels/1 or /levels/1.json
  def show
  end

  # GET /levels/new
  def new
    @level = Level.new
  end

  # GET /levels/1/edit
  def edit
  end

  # POST /levels or /levels.json
  def create
    @level = Level.new(level_params.merge(Level.default_attributes))
    @level.position = @level.next_position

    if @level.save
      redirect_to library_path(@level.library.id, level_id: @level.id)
    end
  end

  # PATCH/PUT /levels/1 or /levels/1.json
  def update
    respond_to do |format|
      if @level.update(level_params)
        format.html { redirect_to level_url(@level), notice: "Level was successfully updated." }
        format.json { render :show, status: :ok, location: @level }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @level.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /levels/1 or /levels/1.json
  def destroy
    @level.destroy

    redirect_to @level.library
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_level
      @level = Level.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def level_params
      params.require(:level).permit(:title, :control, :frog, :layout, :library_id)
    end
end
